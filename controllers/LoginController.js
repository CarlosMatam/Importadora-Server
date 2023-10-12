//importamos el Modelo
import LogeoSModel from '../models/Login.js';
import bcrypt from 'bcrypt';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllLogin = async (req, res) => {
    try {
        const login = await LogeoSModel.findAll({

        })
        res.json(login)
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Mostrar un registro
export const getLogin = async (req, res) => {
    try {
        const login = await LogeoSModel.findAll({
            where: { id_usuario: req.params.id_usuario }
        })
        res.json(login[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Crear un registro
export const createLogin = async (req, res) => {
    try {
        await LogeoSModel.create(req.body)

        res.json({
            "message": "¡Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const ValidacionLogin = async (req, res) => {
    const { login_user, contrasenna } = req.body;

    try {
        const user = await LogeoSModel.findOne({
            where: { login_user },
        });

        if (!user) {
            // El usuario no existe
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.contrasenna !== contrasenna) {
            // La contraseña es incorrecta
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        //para que no se muestre la contraseña en el json
        const UserNuevo = {
            id_usuario: user.id_usuario,
            login_user: user.login_user,

        };

        res.json({
            message: 'Inicio de sesión exitoso',
            user: UserNuevo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};