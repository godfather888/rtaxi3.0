"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sberbankGateway1664015936540", {
    enumerable: true,
    get: function() {
        return sberbankGateway1664015936540;
    }
});
let sberbankGateway1664015936540 = class sberbankGateway1664015936540 {
    async up(queryRunner) {
        try {
            await queryRunner.query("ALTER TABLE payment_gateway MODIFY type enum('stripe', 'braintree', 'paypal', 'paytm', 'razorpay', 'paystack', 'payu', 'instamojo', 'flutterwave', 'paygate', 'mips', 'mercadopago', 'amazon', 'mytmoney', 'wayforpay', 'MyFatoorah', 'SberBank', 'link') NOT NULL;");
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query("ALTER TABLE payment_gateway MODIFY type enum('stripe', 'braintree', 'paypal', 'paytm', 'razorpay', 'paystack', 'payu', 'instamojo', 'flutterwave', 'paygate', 'mips', 'mercadopago', 'amazon', 'mytmoney', 'wayforpay', 'MyFatoorah', 'link') NOT NULL;");
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1664015936540-sberbank-gateway.js.map