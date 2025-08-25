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

// Obtener una planta por ID
r.get('/:id', requireAuth, async (req: AuthedRequest, res: Response) => {
  const id = Number(req.params.id);
  const plant = await prisma.planta.findUnique({ where: { id } });
  if (!plant) return res.status(404).json({ message: 'No encontrada' });

  // Datos adicionales simulados
  const enriched = {
    ...plant,
    estado_actual: 'ok',
    caudal_actual: 0,
    nivel_cloro: 0,
    ph: 7
  };

  res.json(enriched);
});

// Obtener últimas lecturas de una planta
r.get('/:id/lecturas', requireAuth, async (req: AuthedRequest, res: Response) => {
  const id = Number(req.params.id);
  const limit = parseInt((req.query.limit as string) || '5', 10);

  // Generar lecturas simuladas
  const readings = Array.from({ length: limit }, (_, i) => {
    const fecha = new Date(Date.now() - i * 3600 * 1000);
    const caudal = Number((Math.random() * 10).toFixed(2));
    const cloro = Number((Math.random() * 1).toFixed(2));
    const ph = Number((6 + Math.random() * 2).toFixed(2));
    const estado = 'ok';
    return { fecha, caudal, cloro, ph, estado };
  });

  res.json(readings);
});

// Crear (ADMIN u OPERARIO)
r.post('/', requireAuth, async (req: AuthedRequest, res: Response) => {
  const role = req.user?.role;
  if (role !== 'ADMIN' && role !== 'OPERARIO') {
    return res.status(403).json({ message: 'Prohibido' });
  }
  const { nombre, ubicacion, tipo } = req.body || {};
  if (!nombre || !ubicacion || !tipo) {
    return res.status(400).json({ message: 'Faltan campos' });
  }
  const p = await prisma.planta.create({ data: { nombre, ubicacion, tipo } });
  res.status(201).json(p);
});

// Eliminar (solo ADMIN)
r.delete('/:id', requireAuth, requireRole('ADMIN'), async (req: AuthedRequest, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.planta.delete({ where: { id } });
    res.json({ message: 'Planta eliminada' });
  } catch {
    res.status(404).json({ message: 'No encontrada' });
  }
});

export default r;
