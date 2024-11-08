/*
  Warnings:

  - You are about to drop the column `sellerEmail` on the `MarketplaceListing` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MarketplaceListing" DROP CONSTRAINT "MarketplaceListing_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_replyToId_fkey";

-- AlterTable
ALTER TABLE "MarketplaceListing" DROP COLUMN "sellerEmail",
ALTER COLUMN "sellerId" DROP NOT NULL;

-- DropTable
DROP TABLE "Message";

-- AddForeignKey
ALTER TABLE "MarketplaceListing" ADD CONSTRAINT "MarketplaceListing_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
