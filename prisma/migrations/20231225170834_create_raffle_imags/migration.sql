-- CreateTable
CREATE TABLE `raffle_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `raffleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `raffle_images` ADD CONSTRAINT `raffle_images_raffleId_fkey` FOREIGN KEY (`raffleId`) REFERENCES `raffles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
