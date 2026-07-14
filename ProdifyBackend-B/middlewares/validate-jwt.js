'use strict';

import jwt from 'jsonwebtoken';

export const validateJWT = async (req, res, next) => {
  try {
    let token =
      req.header('x-token') ||
      req.header('authorization') ||
      req.query.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No hay token en la petición',
      });
    }

    token = token.replace(/^Bearer\s+/, '');

    // Verificar el token con el mismo secret que usa el AuthService
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar datos del usuario al request
    req.userId = decoded.sub;
    req.userRole = decoded.role || 'USER_ROLE';
    req.tokenData = decoded;

    next();
  } catch (error) {
    console.error('Error validando JWT:', error.message);

    let message = 'Error al verificar el token';

    if (error.name === 'TokenExpiredError') {
      message = 'Token expirado';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Token inválido';
    }

    return res.status(401).json({
      success: false,
      message,
    });
  }
};
