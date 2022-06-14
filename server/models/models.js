const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	//name: { type: DataTypes.STRING, unique: true, allowNull: false },
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: { type: DataTypes.STRING, allowNull: false },
	role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Cart = sequelize.define("cart", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const CartTrack = sequelize.define("cart_track", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Track = sequelize.define("track", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	price: { type: DataTypes.INTEGER, defaultValue: 0 },
	img: { type: DataTypes.STRING },
	mp3: { type: DataTypes.STRING, defaultValue: ""},
	wav: { type: DataTypes.STRING, defaultValue: ""},
	zip: { type: DataTypes.STRING, defaultValue: ""},
	tag: { type: DataTypes.STRING, defaultValue: ""},
	rating: { type: DataTypes.INTEGER, defaultValue: 0 },
	//tags: {type: DataTypes.STRING},
})



const Type = sequelize.define("type", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

// const Performer = sequelize.define("performer", {
// 	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// 	name: { type: DataTypes.STRING, unique: true, allowNull: false },
// 	//description: { type: DataTypes.STRING },
// })

const Rating = sequelize.define("rating", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	rate: { type: DataTypes.INTEGER, allowNull: false },
})

const TrackInfo = sequelize.define("track_info", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
})

// const TypeTrack = sequelize.define("type_track", {
// 	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

// const Orders = sequelize.define('orders', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     complete: {type: DataTypes.BOOLEAN, defaultValue: false},
//     mobile: {type: DataTypes.STRING(25), allowNull: false},
//     userId: {type: DataTypes.INTEGER, allowNull: true},
// })

// const OrderTrack = sequelize.define('order_track', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     trackId: {type: DataTypes.INTEGER, allowNull: false},
//     orderId: {type: DataTypes.INTEGER, allowNull: false},
//     count: {type: DataTypes.INTEGER, allowNull: false},
// })


User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Track)
Track.belongsTo(User)

// User.hasMany(Orders);
// Orders.belongsTo(User,
//     {
//         foreignKey: { name: 'userId' },
//         onDelete: 'CASCADE',
//     }
// );

// Orders.hasMany(OrderDevice);
// OrderDevice.belongsTo(Orders,
//     {
//         foreignKey: { name: 'orderId' },
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE',
//     }
// );

Cart.hasMany(CartTrack)
CartTrack.belongsTo(Cart)

// Type.belongsToMany(Track, { through: TypeTrack })
// Track.belongsToMany(Type, { through: TypeTrack })

// Performer.hasMany(Track)
// Track.belongsTo(Performer)
Type.hasMany(Track)
Track.belongsTo(Type)

Track.hasMany(Rating)
Rating.belongsTo(Track)

Track.hasMany(TrackInfo)
TrackInfo.belongsTo(Track)

Track.hasMany(TrackInfo, { as: "info" })
TrackInfo.belongsTo(Track)

module.exports = {
	User,
	Cart,
	CartTrack,
	Track,
	Type,
	//Performer,
	Rating,
	//TypeTrack,
	TrackInfo,
}
