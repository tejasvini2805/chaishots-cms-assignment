import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding data...')

  const program = await prisma.program.create({
    data: {
      title: 'Demo Program',
      description: 'Chai Shots CMS demo',
      status: 'DRAFT', // important: start as draft
      terms: {
        create: {
          title: 'Term 1',
          order: 1,
          lessons: {
            create: [
              {
                title: 'Published Lesson',
                order: 1,
                status: 'PUBLISHED',
                publishedAt: new Date()
              },
              {
                title: 'Scheduled Lesson Demo',
                order: 2,
                status: 'SCHEDULED',
                publishAt: new Date(Date.now() + 60_000) // +1 minute
              }
            ]
          }
        }
      }
    }
  })

  console.log('✅ Seeded:', program.title)
}


main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
