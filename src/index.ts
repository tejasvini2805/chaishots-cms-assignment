import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const app = Fastify({ logger: true })
const prisma = new PrismaClient()

async function startServer() {
  await app.register(cors, {
    origin: true
  })

  app.get('/health', async () => {
    return { status: 'ok' }
  })

  app.get('/catalog/programs', async () => {
    return prisma.program.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        terms: {
          include: {
            lessons: {
              where: { status: 'PUBLISHED' },
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })
  })

  await app.listen({ port: 3000, host: '0.0.0.0' })
  console.log('🚀 API running on port 3000')
}

startServer().catch(console.error)
