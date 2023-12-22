/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Buyer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Buyer_phone_key` ON `Buyer`(`phone`);
