const mongoose = require('mongoose');
const shortid = require('shortid');

//Esquema de mongoose para la URL
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true
  },
  shortUrl: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d' // Automatically delete after 30 days
  }
});

// Generar shortUrl automáticamente antes de guardar
// Evitar colisiones generando un shortUrl único
urlSchema.pre('save', async function (next) {
  const Url = mongoose.model('Url'); // Evitar referencia circular

  if (!this.shortUrl) {
    let unique = false;
    let newShortUrl;

    // Reintenta hasta encontrar un ID único
    while (!unique) {
      newShortUrl = shortid.generate();
      const existing = await Url.findOne({ shortUrl: newShortUrl });
      if (!existing) {
        unique = true;
      }
    }

    this.shortUrl = newShortUrl;
  }

  next();
})

// Exportar el modelo
module.exports = mongoose.model('Url', urlSchema);
