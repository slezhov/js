import { makeAutoObservable } from "mobx"

export default class TrackStore {
	constructor() {
		this._types = []
		// this._performers = []
		this._tracks = []
		this._selectedType = {}
		//  this._selectedPerformer = {}
		this._page = 1
		this._totalCount = 0
		this._limit = 6
		makeAutoObservable(this)
	}

	setTypes(types) {
		this._types = types
	}
	// setPerformers(performers) {
	//     this._performers = performers
	// }
	setTracks(tracks) {
		this._tracks = tracks
	}

	setSelectedType(type) {
		this.setPage(1)
		this._selectedType = type
	}
	// setSelectedPerformer(performer) {
	//     this.setPage(1)
	//     this._selectedPerformer = performer
	// }
	setPage(page) {
		this._page = page
	}
	setTotalCount(count) {
		this._totalCount = count
	}

	get types() {
		return this._types
	}
	// get performers() {
	//     return this._performers
	// }
	get tracks() {
		return this._tracks
	}
	get selectedType() {
		return this._selectedType
	}
	// get selectedPerformer() {
	//     return this._selectedPerformer
	// }
	get totalCount() {
		return this._totalCount
	}
	get page() {
		return this._page
	}
	get limit() {
		return this._limit
	}
}
