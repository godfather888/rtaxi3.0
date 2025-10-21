"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RideOptionDescription1701195017930", {
    enumerable: true,
    get: function() {
        return RideOptionDescription1701195017930;
    }
});
let RideOptionDescription1701195017930 = class RideOptionDescription1701195017930 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `service_option` ADD COLUMN `description` varchar(255) NULL;');
        } catch (e) {
            console.log(e);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `service_option` DROP COLUMN `description`;');
        } catch (e) {
            console.log(e);
        }
    }
};

//# sourceMappingURL=1701195017930-ride-option-description.js.map