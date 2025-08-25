import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthedRequest extends Request {
  user?: { id:number; email:string; role:'ADMIN'|'OPERARIO'|'PRESIDENTE_JAA'|'USUARIO' };
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev') as AuthedRequest['user'];
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido/expirado' });
  }
}

export function requireRole(role:'ADMIN'|'OPERARIO'|'PRESIDENTE_JAA'|'USUARIO') {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    if (req.user.role !== role) return res.status(403).json({ error: 'Prohibido' });
    next();
  };
}
