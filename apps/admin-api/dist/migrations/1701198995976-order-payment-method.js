"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OrderPaymentMethod1701198995976", {
    enumerable: true,
    get: function() {
        return OrderPaymentMethod1701198995976;
    }
});
let OrderPaymentMethod1701198995976 = class OrderPaymentMethod1701198995976 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` ADD `paymentMode` enum ("cash", "savedPaymentMethod", "paymentGateway", "wallet") NULL;');
            await queryRunner.query('ALTER TABLE `request` ADD `savedPaymentMethodId` int NULL;');
            await queryRunner.query('ALTER TABLE `request` ADD CONSTRAINT FOREIGN KEY (`savedPaymentMethodId`) REFERENCES `saved_payment_method`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;');
        } catch (error) {
            console.log(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` DROP COLUMN `paymentMode`;');
            await queryRunner.query('ALTER TABLE `request` DROP FOREIGN KEY `FK_5f9f6e2c5b4d6f6f3e7d7a7e9e4`;');
            await queryRunner.query('ALTER TABLE `request` DROP COLUMN `savedPaymentMethodId`;');
        } catch (error) {
            console.log(error);
        }
    }
};

//# sourceMappingURL=1701198995976-order-payment-method.js.map