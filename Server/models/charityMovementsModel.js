const mongoose = require('mongoose');

const charitiesMovementsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  charity_id: {
    type: String,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('CharityMovements', charitiesMovementsSchema);
