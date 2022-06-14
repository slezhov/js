const uuid = require("uuid")
const path = require("path")
const { Track, TrackInfo, Type, User } = require("../models/models")
const ApiError = require("../error/ApiError")

class TrackController {
	async create(req, res, next) {
		try {
			let { name, price, typeId, userId, info } = req.body
			const { img } = req.files
			const { mp3 } = req.files
			const { wav } = req.files
			const { zip } = req.files
			const { tag } = req.files
			let imgName = uuid.v4() + ".jpg"
			let mp3Name = uuid.v4() + ".mp3"
			let wavName = uuid.v4() + ".wav"
			let zipName = uuid.v4() + ".zip"
			let tagName = uuid.v4() + "tag.mp3"
			img.mv(path.resolve(__dirname, "..", "static", imgName))
			mp3.mv(path.resolve(__dirname, "..", "static", mp3Name))
			wav.mv(path.resolve(__dirname, "..", "static", wavName))
			zip.mv(path.resolve(__dirname, "..", "static", zipName))
			tag.mv(path.resolve(__dirname, "..", "static", tagName))
			const track = await Track.create({
				name,
				price,
				typeId,
				userId,
				img: imgName,
				mp3: mp3Name,
				wav: wavName,
				zip: zipName,
				tag: tagName,
			})

			if (info) {
				info = JSON.parse(info)
				info.forEach((i) =>
					TrackInfo.create({
						title: i.title,
						description: i.description,
						trackId: track.id,
					})
				)
			}

			return res.json(track)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res, next) {
		try {
			let { typeId, userId, limit, page } = req.query
			page = page || 1
			limit = limit || 20
			let offset = page * limit - limit
			let tracks
			if (!typeId && !userId) {
				tracks = await Track.findAndCountAll({ limit, offset })
			}
			if (userId && !typeId) {
				tracks = await Track.findAndCountAll({
					where: { userId },
					limit,
					offset,
				})
			}
			if (typeId && !userId) {
				tracks = await Track.findAndCountAll({
					where: { typeId },
					limit,
					offset,
				})
			}
			if (userId && typeId) {
				tracks = await Track.findAndCountAll({
					where: { typeId, userId },
					limit,
					offset,
				})
			}
			return res.json(tracks)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params
			let tracks = await Track.findOne({
				where: { id },
				include: [
					{ model: TrackInfo, as: "info" },
					{ model: Type },
					{ model: User },
				],
			})
			return res.json(tracks)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params
			await Track.findOne({ where: { id } }).then(async (data) => {
				if (data) {
					await Track.destroy({ where: { id } }).then(() => {
						return res.json("Трек удалён")
					})
				} else {
					return res.json("Такого трека не существует")
				}

				//await OrderTrack.destroy({ where: { trackId: id } })
				await CartTrack.destroy({ where: { trackId: id } })
			})
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
}


module.exports = new TrackController()
