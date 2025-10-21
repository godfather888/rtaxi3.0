"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SavedPaymentMethodFields1701195286460", {
    enumerable: true,
    get: function() {
        return SavedPaymentMethodFields1701195286460;
    }
});
let SavedPaymentMethodFields1701195286460 = class SavedPaymentMethodFields1701195286460 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `saved_payment_method` ADD COLUMN `lastFour` varchar(255) NULL;');
            await queryRunner.query('ALTER TABLE `saved_payment_method` ADD COLUMN `isEnabled` boolean DEFAULT true;');
            await queryRunner.query('ALTER TABLE `saved_payment_method` ADD COLUMN `isDefault` boolean DEFAULT false;');
        } catch (e) {
            console.log(e);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `saved_payment_method` DROP COLUMN `lastFour`;');
            await queryRunner.query('ALTER TABLE `saved_payment_method` DROP COLUMN `isEnabled`;');
            await queryRunner.query('ALTER TABLE `saved_payment_method` DROP COLUMN `isDefault`;');
        } catch (e) {
            console.log(e);
        }
    }
};

//# sourceMappingURL=1701195286460-saved-payment-method-fields.js.map