/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Children` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[childId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `childId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Children" DROP CONSTRAINT "Children_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Children" DROP COLUMN "subscriptionId";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "childId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_childId_key" ON "Subscription"("childId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
