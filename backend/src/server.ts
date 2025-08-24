import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth';
import meRouter from './routes/me';
import plantasRouter from './routes/plantas';
import { requireAuth, requireRole } from './middleware/auth';

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: ['http://localhost:5173'], credentials: false }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/auth', authRouter);
app.use('/me', meRouter);
app.use('/plantas', plantasRouter);

// ejemplo protegido estrictamente por rol
app.get('/admin/only', requireAuth, requireRole('ADMIN'), (_req, res) => {
  res.json({ ok: true, area: 'ADMIN' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));

process.on('SIGINT', async () => { await prisma.$disconnect(); process.exit(0); });
