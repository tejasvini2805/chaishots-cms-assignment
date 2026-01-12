"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const client_1 = require("@prisma/client");
const app = (0, fastify_1.default)({ logger: true });
const prisma = new client_1.PrismaClient();
async function startServer() {
    await app.register(cors_1.default, {
        origin: true
    });
    app.get('/health', async () => {
        return { status: 'ok' };
    });
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
        });
    });
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 API running on port 3000');
}
startServer().catch(console.error);
