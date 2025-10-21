"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StoreCountryCode1701195564666", {
    enumerable: true,
    get: function() {
        return StoreCountryCode1701195564666;
    }
});
let StoreCountryCode1701195564666 = class StoreCountryCode1701195564666 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `driver` ADD COLUMN `countryIso` varchar(5) NULL;');
        } catch (e) {
            console.log(e);
        }
        try {
            await queryRunner.query('ALTER TABLE `rider` ADD COLUMN `countryIso` varchar(5) NULL;');
        } catch (e) {
            console.log(e);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `driver` DROP COLUMN `countryIso`;');
        } catch (e) {
            console.log(e);
        }
        try {
            await queryRunner.query('ALTER TABLE `rider` DROP COLUMN `countryIso`;');
        } catch (e) {
            console.log(e);
        }
    }
};

//# sourceMappingURL=1701195564666-store-country-code.js.map