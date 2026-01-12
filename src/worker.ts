import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function runWorker() {
  const now = new Date()
  console.log('🕒 Worker tick at', now.toISOString())

  // Find lessons that should be published
  const lessons = await prisma.lesson.findMany({
    where: {
      status: 'SCHEDULED',
      publishAt: {
        lte: now
      }
    }
  })

  if (lessons.length === 0) {
    console.log('No lessons to publish')
    return
  }

  for (const lesson of lessons) {
    await prisma.$transaction(async (tx) => {
      // Idempotent publish
      const updated = await tx.lesson.updateMany({
        where: {
          id: lesson.id,
          status: 'SCHEDULED'
        },
        data: {
          status: 'PUBLISHED',
          publishedAt: now
        }
      })

      if (updated.count === 0) return

      // Auto-publish program
      const term = await tx.term.findUnique({
        where: { id: lesson.termId }
      })

      if (!term) return

      await tx.program.updateMany({
        where: {
          id: term.programId,
          status: 'DRAFT'
        },
        data: {
          status: 'PUBLISHED',
          publishedAt: now
        }
      })

      console.log(`✅ Published lesson: ${lesson.title}`)
    })
  }
}

// Run every minute
setInterval(() => {
  runWorker().catch(console.error)
}, 60_000)

// Run once immediately
runWorker().catch(console.error)

console.log('🚀 Worker started')
