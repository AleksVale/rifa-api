/*
  Warnings:

  - You are about to drop the column `expirationDate` on the `tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `expirationDate`;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `expirationDate` DATETIME(3) NULL;
