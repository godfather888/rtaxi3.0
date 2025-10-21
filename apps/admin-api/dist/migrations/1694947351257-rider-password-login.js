"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RiderPasswordLogin1694947351257", {
    enumerable: true,
    get: function() {
        return RiderPasswordLogin1694947351257;
    }
});
let RiderPasswordLogin1694947351257 = class RiderPasswordLogin1694947351257 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `rider` ADD COLUMN `password` VARCHAR(255) NULL DEFAULT NULL');
        } catch (error) {
            console.error('Error adding password column:', error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `rider` DROP COLUMN `password`');
        } catch (error) {
            console.error('Error dropping password column:', error);
        }
    }
};

//# sourceMappingURL=1694947351257-rider-password-login.js.map