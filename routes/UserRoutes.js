const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControlles');
const { authenticateToken } = require('../middlewares/AuthMiddleware');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       409:
 *         description: Usuario o email ya existe
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtener datos del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: No autenticado
 */

/**
 * @swagger
 * /users/{userName}:
 *   get:
 *     summary: Buscar un usuario por nombre de usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /users/{userName}:
 *   delete:
 *     summary: Eliminar un usuario por nombre de usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */



// Rutas para manejar usuarios
router.post('/register', UserController.createUserController);

// Ruta ME antes de la ruta dinámica
router.get('/me', authenticateToken, (req, res) => {
  res.status(200).json({ userName: req.user.userName });
});

router.get('/:userName', UserController.findUserByUsernameController);
router.post('/login', UserController.loginUserController);
router.delete('/:userName', UserController.deleteUserController);


// Exportar el router
module.exports = router;