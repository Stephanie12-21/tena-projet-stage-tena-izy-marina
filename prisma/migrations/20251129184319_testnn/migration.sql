-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_childId_fkey";

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Children"("id") ON DELETE CASCADE ON UPDATE CASCADE;
