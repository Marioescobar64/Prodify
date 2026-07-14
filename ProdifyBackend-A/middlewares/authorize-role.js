'use strict';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.userRole;

    if (!userRole) {
      return res.status(401).json({
        success: false,
        message: 'No se encontró el rol del usuario en el token',
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `No tienes permisos para esta acción. Rol requerido: ${allowedRoles.join(' o ')}`,
      });
    }

    next();
  };
};

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN_ROLE',
  ADMIN: 'ADMIN_ROLE',
  CAJERO: 'CAJERO_ROLE',
  USER: 'USER_ROLE',
};

export const ALL_ADMIN_ROLES = [ROLES.SUPER_ADMIN, ROLES.ADMIN];
export const ALL_STAFF_ROLES = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CAJERO];
export const ALL_ROLES = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CAJERO, ROLES.USER];
