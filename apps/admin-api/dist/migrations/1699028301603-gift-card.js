"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GiftCard1699028301603", {
    enumerable: true,
    get: function() {
        return GiftCard1699028301603;
    }
});
let GiftCard1699028301603 = class GiftCard1699028301603 {
    async up(queryRunner) {
        try {
            await queryRunner.query('CREATE TABLE `gift` (`id` int NOT NULL PRIMARY KEY AUTO_INCREMENT, `currency` varchar(3) NOT NULL, `amount` float(10,2) NOT NULL, `availableFrom` datetime NOT NULL, `expireAt` datetime NOT NULL);');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('CREATE TABLE `gift_card` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `code` varchar(255) NOT NULL, `amount` float(10,2) NOT NULL, `availableTimestamp` datetime NOT NULL, `expirationTimestamp` datetime NOT NULL, `isUsed` tinyint NOT NULL, `currency` varchar(3) NOT NULL);');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `rider_transaction` ADD COLUMN `giftCardId` int DEFAULT NULL;');
            await queryRunner.query('ALTER TABLE `rider_transaction` ADD CONSTRAINT FOREIGN KEY (`giftCardId`) REFERENCES `gift_card`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `driver_transaction` ADD COLUMN `giftCardId` int DEFAULT NULL;');
            await queryRunner.query('ALTER TABLE `driver_transaction` ADD CONSTRAINT FOREIGN KEY (`giftCardId`) REFERENCES `gift_card`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1699028301603-gift-card.js.map