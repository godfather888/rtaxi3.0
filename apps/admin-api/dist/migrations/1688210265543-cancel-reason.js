"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cancelReason1688210265543", {
    enumerable: true,
    get: function() {
        return cancelReason1688210265543;
    }
});
let cancelReason1688210265543 = class cancelReason1688210265543 {
    async up(queryRunner) {
        try {
            await queryRunner.query("CREATE TABLE `order_cancel_reason` (`id` int NOT NULL PRIMARY KEY AUTO_INCREMENT, `title` varchar(255) NOT NULL, `isEnabled` tinyint NOT NULL DEFAULT 1, `userType` enum('Driver','Rider', 'Operator') NOT NULL DEFAULT 'Rider');");
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `request` ADD `cancelReasonId` int NULL');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` DROP `cancelReasonId`');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('DROP TABLE `order_cancel_reason`');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1688210265543-cancel-reason.js.map