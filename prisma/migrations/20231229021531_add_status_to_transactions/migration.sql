-- AlterTable
ALTER TABLE `prizes` ADD COLUMN `buyerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `tickets` MODIFY `status` ENUM('PENDING', 'PAID', 'CANCELLED', 'EXPIRED') NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `status` ENUM('PENDING', 'PAID', 'CANCELLED', 'EXPIRED') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `prizes` ADD CONSTRAINT `prizes_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `buyers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
