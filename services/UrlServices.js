// Importar el modelo de URL
const Url = require('../models/url');

//Guarda una URL en la base de datos
const createUrl = async (urlData) => {  
    const url = new Url(urlData);

    try {
        await url.save();
        return url;
    } catch (error) {
        throw new Error('Error saving URL: ' + error.message);
    }
} 

// Busca una URL por su shortUrl
const findUrl = async (shortUrl) => {
    try {
        const url = await Url.findOne({ shortUrl });
        if (!url) {
            throw new Error('URL not found');
        } 
        return url;}
    catch (error) {
        throw new Error('Error finding URL: ' + error.message);
    }
}

// Elimina una URL por su shortUrl
const deleteUrl = async (shortUrl) => {
    try {
        const result = await Url.deleteOne({ shortUrl });
        if (result.deletedCount === 0) {
            throw new Error('URL not found for deletion');
        }
        return { message: 'URL deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting URL: ' + error.message);
    }
}

// Busca todas las URLs de un usuario por su nombre de usuario
const findUrlsByUser = async (userId) => {
    try {
        const urls = await Url.find({ user: userId });
        if (urls.length === 0) {
            return []; // Retorna un array vacío si no hay URLs
        }
        return urls;
    } catch (error) {
        throw new Error('Error finding URLs by user: ' + error.message);
    }
}

// Redirige a la URL original
const redirectToOriginalUrl = async (shortUrl) => {
    try {
        const url = await findUrl(shortUrl);
        if (url) {
            return url.originalUrl; // Retorna la URL original para redirigir
        } else {
            throw new Error('URL not found');
        }
    } catch (error) {
        throw new Error('Error redirecting to original URL: ' + error.message);
    }
}

// Exportar las funciones
module.exports = {
    createUrl,
    findUrl,
    deleteUrl,
    findUrlsByUser,
    redirectToOriginalUrl
};