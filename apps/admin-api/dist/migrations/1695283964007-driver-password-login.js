"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DriverPasswordLogin1695283964007", {
    enumerable: true,
    get: function() {
        return DriverPasswordLogin1695283964007;
    }
});
let DriverPasswordLogin1695283964007 = class DriverPasswordLogin1695283964007 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `driver` ADD COLUMN `password` varchar(255) NULL DEFAULT NULL');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `driver` DROP COLUMN `password`');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1695283964007-driver-password-login.js.map