import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole, AuthedRequest } from '../middleware/auth';

const prisma = new PrismaClient();
const r = Router();

// Listar (auth requerido)
r.get('/', requireAuth, async (_req: AuthedRequest, res: Response) => {
  const all = await prisma.planta.findMany({ orderBy: { id: 'asc' } });
  res.json(all);
});

// Crear (ADMIN u OPERARIO)
r.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
  const role = req.user?.role;
  if (role !== 'ADMIN' && role !== 'OPERARIO') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  const { nombre, ubicacion, tipo } = req.body || {};
  if (!nombre || !ubicacion || !tipo) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  const p = await prisma.planta.create({ data: { nombre, ubicacion, tipo } });
  res.status(201).json(p);
});

// Eliminar (solo ADMIN)
r.delete('/:id', requireAuth, requireRole('ADMIN'), async (req: AuthedRequest, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.planta.delete({ where: { id } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: 'No encontrada' });
  }
});

export default r;
