const mongoose = require('mongoose');


const TicketSchema = new mongoose.Schema({
  NomEvenement: { type: String, required: true },
  prix: { type: Number, required: true },

  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  nbrTickets: { type: Number, required: true },
  telespectateurs: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
  beneficeTickets: { type: Number, required: true,default:0 },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'evenement' ,required: true},
  organ: { type: mongoose.Schema.Types.ObjectId, ref: 'orgnanisation' ,required: true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", TicketSchema);
