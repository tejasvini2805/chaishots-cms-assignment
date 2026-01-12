"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding data...');
    // Clean existing data (safe for dev)
    await prisma.lesson.deleteMany();
    await prisma.term.deleteMany();
    await prisma.program.deleteMany();
    // Create Program
    const program = await prisma.program.create({
        data: {
            title: 'Demo Program',
            description: 'Chai Shots CMS demo',
            status: 'DRAFT', // important: auto-published by worker
            languagePrimary: 'en',
            languagesAvailable: ['en'],
            posterAssets: {
                en: {
                    portrait: 'https://example.com/program-poster-portrait.jpg',
                    landscape: 'https://example.com/program-poster-landscape.jpg'
                }
            },
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
                                publishedAt: new Date(),
                                contentType: 'VIDEO',
                                contentLanguagePrimary: 'en',
                                contentUrlsByLanguage: {
                                    en: 'https://example.com/video-en.mp4'
                                },
                                thumbnailAssets: {
                                    en: {
                                        portrait: 'https://example.com/thumb1-portrait.jpg',
                                        landscape: 'https://example.com/thumb1-landscape.jpg'
                                    }
                                }
                            },
                            {
                                title: 'Scheduled Lesson Demo',
                                order: 2,
                                status: 'SCHEDULED',
                                publishAt: new Date(Date.now() + 60000), // +1 minute
                                contentType: 'ARTICLE',
                                contentLanguagePrimary: 'en',
                                contentUrlsByLanguage: {
                                    en: 'https://example.com/article-en.pdf'
                                },
                                thumbnailAssets: {
                                    en: {
                                        portrait: 'https://example.com/thumb2-portrait.jpg',
                                        landscape: 'https://example.com/thumb2-landscape.jpg'
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    });
    console.log('✅ Seeded Program:', program.title);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
