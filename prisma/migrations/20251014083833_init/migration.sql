-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PARENT', 'ADMIN', 'DRIVER');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Children" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "homeLat" DOUBLE PRECISION NOT NULL,
    "homeLong" DOUBLE PRECISION NOT NULL,
    "schoolId" TEXT NOT NULL,
    "imageprofileId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "schoolLat" DOUBLE PRECISION NOT NULL,
    "schoolLong" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Children_imageprofileId_key" ON "Children"("imageprofileId");

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_imageprofileId_fkey" FOREIGN KEY ("imageprofileId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
