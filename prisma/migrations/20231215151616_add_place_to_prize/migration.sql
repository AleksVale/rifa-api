/*
  Warnings:

  - Added the required column `place` to the `prizes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prizes` ADD COLUMN `place` INTEGER NOT NULL;
