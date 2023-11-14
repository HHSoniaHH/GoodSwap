const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  nbrParticipant: { type: Number, required: true },
  nbrTelespectateur: { type: Number, required: true },

  description: { type: String },
  participants: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
  telespectateurs: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
  beneficeTickets: { type: Number, required: false },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("evenement", eventSchema);
