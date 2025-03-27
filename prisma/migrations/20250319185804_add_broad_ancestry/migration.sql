-- CreateTable
CREATE TABLE `BroadAncestry` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Symbol` VARCHAR(191) NOT NULL,
    `Display_category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BroadAncestry_Symbol_key`(`Symbol`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
