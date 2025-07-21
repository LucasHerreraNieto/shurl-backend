const urlControllers = require('../controllers/UrlControllers');
const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middlewares/AuthMiddleware');


/**
 * @swagger
 * tags:
 *   name: URLs
 *   description: Operaciones relacionadas con URLs cortas
 */

/**
 * @swagger
 * /urls:
 *   post:
 *     summary: Crear una nueva URL corta
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *               - userName
 *             properties:
 *               originalUrl:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       201:
 *         description: URL creada exitosamente
 *       400:
 *         description: Límite alcanzado o datos inválidos
 */

/**
 * @swagger
 * /urls/{shortUrl}:
 *   get:
 *     summary: Obtener una URL por su shortUrl
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador corto de la URL
 *     responses:
 *       200:
 *         description: URL encontrada
 *       404:
 *         description: URL no encontrada
 */

/**
 * @swagger
 * /urls/{shortUrl}:
 *   delete:
 *     summary: Eliminar una URL por su shortUrl
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador corto de la URL
 *     responses:
 *       200:
 *         description: URL eliminada exitosamente
 *       404:
 *         description: URL no encontrada
 */

/**
 * @swagger
 * /users/{userName}/urls:
 *   get:
 *     summary: Obtener todas las URLs de un usuario
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario
 *     responses:
 *       200:
 *         description: Lista de URLs del usuario
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /urls/redirect/{shortUrl}:
 *   get:
 *     summary: Redirigir a la URL original usando shortUrl
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador corto de la URL
 *     responses:
 *       302:
 *         description: Redirección a la URL original
 *       404:
 *         description: URL no encontrada
 */


// Ruta para crear una URL
router.post('/urls' ,authenticateToken ,urlControllers.createUrlController);

// Ruta para buscar una URL por su shortUrl
router.get('/urls/:shortUrl',authenticateToken , urlControllers.findUrlController);
 
// Ruta para eliminar una URL por su shortUrl
router.delete('/urls/:shortUrl',authenticateToken , urlControllers.deleteUrlController);

// Ruta para buscar todas las URLs de un usuario por su nombre de usuario
router.get('/users/:userName/urls',authenticateToken , urlControllers.findUrlsByUserController);

// Ruta para redirigir a la URL original
router.get('/:shortUrl' , urlControllers.redirectToOriginalUrlController);

// Exportar el router
module.exports = router;



