const serviceUrl = require('../services/UrlServices');
const userModel = require('../models/user');

// Controlador para crear una URL
const createUrlController = async (req, res) => {
  try {
    const { originalUrl, userName } = req.body;
    // Buscar usuario por userName
    const user = await userModel.findOne({ userName });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const urls = await serviceUrl.findUrlsByUser(user._id);
    // Verificar si el usuario ya tiene 5 URLs
    if (urls.length >= 5) {
      return res.status(400).json({ error: 'User has reached the limit of 5 URLs' });
    }

    // Validar originalUrl (opcional, depende de tu lógica)
    if (!originalUrl || typeof originalUrl !== 'string') {
      return res.status(400).json({ error: 'Invalid original URL' });
    }

    // Crear la URL con el user._id asociado
    const newUrl = await serviceUrl.createUrl({
      originalUrl,
      user: user._id
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controlador para buscar una URL por su shortUrl
const findUrlController = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const url = await serviceUrl.findUrl(shortUrl);
        res.status(200).json(url);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Controlador para eliminar una URL por su shortUrl
const deleteUrlController = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const result = await serviceUrl.deleteUrl(shortUrl);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Controlador para buscar todas las URLs de un usuario por su nombre de usuario
const findUrlsByUserController = async (req, res) => {
    try {
        const { userName } = req.params;
        //Busca el usuario por su nombre de usuario
        const user = await userModel.findOne({ userName });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const urls = await serviceUrl.findUrlsByUser(user._id);
        res.status(200).json(urls);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Controlador para redirigir a la URL original
const redirectToOriginalUrlController = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const originalUrl = await serviceUrl.redirectToOriginalUrl(shortUrl);
        res.redirect(originalUrl);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Exportar los controladores
module.exports = {
    createUrlController,
    findUrlController,
    deleteUrlController,
    findUrlsByUserController,
    redirectToOriginalUrlController
};