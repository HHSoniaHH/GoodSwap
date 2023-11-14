const EventModel = require("../models/EventModel");
const Organisation = require("../models/OrganisationModel");
const TicketModel = require("../models/TicketModel");
const UserModel = require("../models/UserModel");
const PDFDocument = require('pdfkit')
const fs = require('fs');
// Evenement
exports.createEvent=async(req, res) =>{
    const { titre, date, location, description,nbrParticipant,nbrTelespectateur } = req.body;
    const createdBy = req.params.id;
  
 
    const organ=await Organisation.findById(createdBy)
 
  
    // Create a new event document
    const event = new EventModel({
      titre: titre,
      date: date,
      nbrParticipant:nbrParticipant,
      nbrTelespectateur:nbrTelespectateur,
      location: location,
      description: description,
      participants: [],
      telespectateurs:[],
      createdBy: createdBy,
    });
  

  
    // Save the event to the database
    event.save()
      .then((event) => {
        res.json({data:event,message:"Evenement cree avec success",success:true,organ:organ});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error creating event' });
      });
  }
  exports.getAllEvent=async(req,res)=>{
  
    try {
    
      const events= await EventModel.find({});
      res.json({ data:events, success: true });
    } catch (error) {
      console.log(error);
    }
  }
exports.getAllEventByOrgan=async(req,res)=>{
    const id=req.params.id
    try {
    
      const event= await EventModel.find({createdBy:id});
      res.json({ data:event, success: true });
    } catch (error) {
      console.log(error);
    }
  }

exports.addParticipant = async (req, res) => {
    const eventId = req.params.id;
    const participant = req.body.participant;
  
    // Validate participant
    if (!participant || typeof participant !== 'string') {
      return res.json({ message: 'Invalid participant data' });
    }
  
    try {
      // Find the event by ID
      const event = await EventModel.findById(eventId);
  
      if (!event) {
        return res.json({ message: 'Evenement non trouvé' });
      }
  
      if (event.participants.includes(participant)) {
          return res.json({ message: "Vous avez déja inscrit dans l'evenement" });
        }
        // Check if maximum number of attendees reached
        if (event.participants.length >= event.nbrParticipant) {
          return res.json({ message: 'Le nombre maximum des participants est complet nous sommes désolé la prochaine fois inshallah' });
        }
  
      // Add attendee to the event document
      event.participants.push(participant);
  
      // Save the updated event to the database
      const updatedEvent = await event.save();
  
      res.json({ data: updatedEvent, message: 'Participant ajouté avec succées' });
  
    } catch (error) {
      console.error(error);
      res.json({ message: "Error lors de l'inscription  du Participant to event" });
    }
  };


  // Tickets
   //Action Organisation
exports.createTicket=async(req, res) =>{
    const {  prix } = req.body;
    const eventId = req.params.id;
  
 
    const event=await EventModel.findById(eventId)
 
  
    // Create a new event document
    const tickets = new TicketModel({

      NomEvenement: event.titre,
      prix:prix,
      date: event.date,
      nbrTickets:event.nbrTelespectateur,
      location: event.location,
      description: event.description,
      telespectateurs: [],
      event: eventId,
      organ:event.createdBy
    });
  

  
    // Save the event to the database
    tickets.save()
      .then((event) => {
        res.json({data:tickets,message:"ticket cree avec success",event:event});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error creating ticket' });
      });
  }
exports.getAllTicketByEvent=async(req,res)=>{
    const id=req.params.id
    try {
    
      const ticket= await TicketModel.find({event:id});
      res.json({ data: ticket, success: true });
    } catch (error) {
      console.log(error);
    }
  }
  //Action Utilisateur
exports.reserverUnticket=async(req,res)=>{
const idUser =req.params.idUser
const idTiket =req.params.idTiket
const {montant}=req.body
try {
  const user=await UserModel.findById(idUser)
  const ticket=await TicketModel.findById(idTiket)

if(!user) return res.json({success:false,message:'user non trouver'})
if(!ticket) return res.json({success:false,message:'tikets non trouver'})
if(ticket.prix!==montant) return res.json({success:false,message:'montant est insuffisant  '})


ticket.beneficeTickets+=montant;

if (ticket.telespectateurs.includes(idUser)) {
  return res.json({ message: "Vous avez déja reserver un ticket dans l'evenement" });
}
// Check if maximum number of telespectateurs reached
if (ticket.telespectateurs.length >= ticket.nbrTickets) {
  return res.json({ message: 'Tous les tickets sont reservée nous sommes désolé la prochaine fois inshallah' });
}

// Add attendee to the ticket document
ticket.telespectateurs.push(idUser);
const event =await EventModel.findById(ticket.event)
event.telespectateurs.push(idUser);
// Save the updated ticket to the database
const updatedTicket = await ticket.save();
const updatedEvent = await event.save();


res.json({ success:true ,message: 'tikcet reserver avec succées',ticket: updatedTicket,event:updatedEvent,user:user  });



} catch (error) {
  
}}

exports.ImprimerTicket=async(req,res)=>{
const id =req.params.id
const idTicket =req.params.idTicket
   const user =await UserModel.findById(id)
   const ticket =await TicketModel.findById(idTicket)

  const doc = new PDFDocument({
    size: [300, 200], // Set custom page size (width, height)
    margins: { // Set custom margins
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  });


 doc.fontSize(16)
    .text('Your Ticket', { align: 'center' })
    .moveDown() // move the cursor down one line
    .lineWidth(0.5)
    .moveTo(10, 25)
    .lineTo(doc.page.width - 10, 25)
    .stroke();
 doc.fontSize(12)
    .text(`Nom et Prenom: ${user.fname}   ${user.lname}`)
    .text(`Evenement: ${ticket.NomEvenement}`)
    .text(`Location: ${ticket.location}`)

    .text(`Date: ${ticket.date}`)
   
    .text(`Prix: ${ticket.prix} DA`);
 
 res.setHeader('Content-Type', 'application/pdf');
 res.setHeader('Content-Disposition', `attachment; filename=ticket-rr.pdf`);

 const writeStream = fs.createWriteStream(`ticket.pdf`);
 doc.pipe(writeStream);
 doc.pipe(res);
 doc.end();

 writeStream.on('finish', () => {
   console.log('PDF file saved!');
 });



}
exports.AnnulerReserverUnticket=async(req,res)=>{
  const idUser =req.params.idUser
  const idTiket =req.params.idTiket

  try {
    const user=await UserModel.findById(idUser)
    const ticket=await TicketModel.findById(idTiket)
  
  if(!user) return res.json({success:false,message:'user non trouver'})
  if(!ticket) return res.json({success:false,message:'tikets non trouver'})
  
  
  ticket.beneficeTickets-=ticket.prix;
  
  if (ticket.telespectateurs.includes(idUser)) {
    ticket.telespectateurs.pull(idUser);
    const event =await EventModel.findById(ticket.event)
    event.telespectateurs.pull(idUser);
    const updatedTicket = await ticket.save();
    const updatedEvent = await event.save();
    res.json({ success:true,message: ' Annulation de la reservation du tickets avec succées',ticket: updatedTicket,event:updatedEvent,user:user  });
  }else{
    res.json({ message: ' Annulation de la reservation du tickets avec succées',ticket: updatedTicket,event:updatedEvent,user:user  });

  }



  // Save the updated ticket to the database
  
  
  
  } catch (error) {
    
  }
  
  
  
  
  }
