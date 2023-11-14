const mongoose = require('mongoose');


mongoose.set("strictQuery", false);

module.exports =


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   

  })
  .then(() => {
           console.log('Connexion etablié avec succées');
  })
  .catch((error) => console.log('Conncexion échoué'));