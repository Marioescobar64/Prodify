import { User } from '../users/user.model.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        const userExists = await User.findOne({ where: { correo } });
        if (userExists) {
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }

        const hashedPassword = await argon2.hash(contraseña);

        const newUser = await User.create({
            nombre,
            correo,
            contraseña: hashedPassword
        });

        res.status(201).json({
            msg: 'Usuario registrado exitosamente',
            user: {
                id: newUser.Id,
                nombre: newUser.nombre,
                correo: newUser.correo
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar usuario', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        const user = await User.findOne({ where: { correo } });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const validPassword = await argon2.verify(user.contraseña, contraseña);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const payload = {
            sub: user.Id,
            nombre: user.nombre
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'super_secret_jwt_key_prodify', {
            expiresIn: '4h'
        });

        res.json({
            msg: 'Inicio de sesión exitoso',
            user: {
                id: user.Id,
                nombre: user.nombre,
                correo: user.correo
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión', error: error.message });
    }
};
