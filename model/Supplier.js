const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: { type: String, required: true },
  address: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
