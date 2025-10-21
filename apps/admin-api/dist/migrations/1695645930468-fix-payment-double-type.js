"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FixPaymentDoubleType1695645930468", {
    enumerable: true,
    get: function() {
        return FixPaymentDoubleType1695645930468;
    }
});
let FixPaymentDoubleType1695645930468 = class FixPaymentDoubleType1695645930468 {
    async up(queryRunner) {
        try {
            await queryRunner.query("ALTER TABLE `payment` CHANGE COLUMN `amount` `amount` float(10,2) NOT NULL DEFAULT '0.00'");
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1695645930468-fix-payment-double-type.js.map