"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "increaseGatewayKeySize1684740421419", {
    enumerable: true,
    get: function() {
        return increaseGatewayKeySize1684740421419;
    }
});
let increaseGatewayKeySize1684740421419 = class increaseGatewayKeySize1684740421419 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `payment_gateway` MODIFY `privateKey` TEXT NULL');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `payment_gateway` MODIFY `publicKey` TEXT NULL');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `payment_gateway` MODIFY `merchantId` TEXT NULL');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `payment_gateway` MODIFY `saltKey` TEXT NULL');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1684740421419-increase-gateway-key-size.js.map