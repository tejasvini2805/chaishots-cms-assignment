/*
  Warnings:

  - Added the required column `contentLanguagePrimary` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentUrlsByLanguage` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailAssets` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languagePrimary` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterAssets` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('VIDEO', 'ARTICLE');

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "contentLanguagePrimary" TEXT NOT NULL,
ADD COLUMN     "contentLanguagesAvailable" TEXT[],
ADD COLUMN     "contentType" "ContentType" NOT NULL,
ADD COLUMN     "contentUrlsByLanguage" JSONB NOT NULL,
ADD COLUMN     "durationMs" INTEGER,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subtitleLanguages" TEXT[],
ADD COLUMN     "subtitleUrlsByLanguage" JSONB,
ADD COLUMN     "thumbnailAssets" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "languagePrimary" TEXT NOT NULL,
ADD COLUMN     "languagesAvailable" TEXT[],
ADD COLUMN     "posterAssets" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Term" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramTopic" (
    "programId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    CONSTRAINT "ProgramTopic_pkey" PRIMARY KEY ("programId","topicId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- AddForeignKey
ALTER TABLE "ProgramTopic" ADD CONSTRAINT "ProgramTopic_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramTopic" ADD CONSTRAINT "ProgramTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
