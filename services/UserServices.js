const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta_super_segura" // Contraseña secreta para firmar el token JWT
const JWT_EXPIRATION = '1h'; // Tiempo de expiración del token

//Crea un nuevo usuario
const createUser = async (userData) => {
    const user = new userModel(userData);

    try {
        // Check if the user already exists
        const existingUserbyUsername = await findUserByUsername(user.userName);
        const existingUserbyEmail = await findUserByEmail(user.email);
        if (existingUserbyUsername) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        if(existingUserbyEmail){
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }
        await user.save();
        const { password: _, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;

    } catch (error) {
        throw new Error('Error saving user: ' + error.message);
    }
}

// Inicia sesión de un usuario
// Verifica el nombre de usuario y la contraseña
const loginUser = async (userName, password) => {
    try {
        const user = await findUserByUsername(userName);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('incorrect password');
        }
         // Generar token
        const token = jwt.sign(
            { userId: user._id, userName: user.userName }, // payload
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );
        // Retornar usuario (sin la contraseña) y el token
        const { password: _, ...userWithoutPassword} = user.toObject();
        return { user: userWithoutPassword, token };
    }
    catch (error) {
        throw new Error(error.message);
    }
};

// Busca un usuario por su nombre de usuario
const findUserByUsername = async (userName) => {
    try {
        return await userModel.findOne({ userName });
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
};

// Busca un usuario por email
const findUserByEmail = async (email) => {
    try {
        return await userModel.findOne({ email });
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
}


// Elimina un usuario por su nombre de usuario
const deleteUser = async (userName) => {
    try {
        const result = await userModel.deleteOne({ userName });
        if (result.deletedCount === 0) {
            throw new Error('User not found for deletion');
        }
        return { message: 'User deleted successfully' };
    }
    catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}


module.exports = {
    createUser,
    findUserByUsername,
    deleteUser,
    loginUser
};