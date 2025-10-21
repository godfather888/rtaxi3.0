"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userLastSeenDate1678703202140", {
    enumerable: true,
    get: function() {
        return userLastSeenDate1678703202140;
    }
});
let userLastSeenDate1678703202140 = class userLastSeenDate1678703202140 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` ADD `driverLastSeenMessagesAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `request` ADD `riderLastSeenMessagesAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` DROP COLUMN `driverLastSeenMessagesAt`');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `request` DROP COLUMN `riderLastSeenMessagesAt`');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1678703202140-user-last-seen-date.js.map