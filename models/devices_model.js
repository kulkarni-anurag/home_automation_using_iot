const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devicesSchema = new Schema({
    dname: {
		type: String,
		required: true,
	},
	dstatus: {
		type: Number,
		required: true,
		default: 0
	}
});

module.exports = devices_model = mongoose.model('devices_lists', devicesSchema);