const userServices = require('../services/UserServices');

// Controlador para crear un nuevo usuario
const createUserController = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userServices.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para iniciar sesión de un usuario
const loginUserController = async (req, res) => {
     const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const { user, token } = await userServices.loginUser(userName, password);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,            
        sameSite: 'None',
        maxAge: 3600000 // 1 hora
      })
      .status(200)
      .json({
        message: 'Login successful',
        user
      });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Controlador para buscar un usuario por su nombre de usuario
const findUserByUsernameController = async (req, res) => {
    try {
        const { userName } = req.params;
        if (!userName) {
            return res.status(400).json({ error: 'Username is required' });
        }
        const user = await userServices.findUserByUsername(userName);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Controlador para eliminar un usuario por su nombre de usuario
const deleteUserController = async (req, res) => {
    try {
        const { userName } = req.params;
        const result = await userServices.deleteUser(userName);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Exportar los controladores
module.exports = {
    createUserController,
    findUserByUsernameController,
    deleteUserController,
    loginUserController 
};