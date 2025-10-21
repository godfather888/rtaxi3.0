"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddBinancePay1691157697552", {
    enumerable: true,
    get: function() {
        return AddBinancePay1691157697552;
    }
});
let AddBinancePay1691157697552 = class AddBinancePay1691157697552 {
    async up(queryRunner) {
        try {
            await queryRunner.query("ALTER TABLE payment_gateway MODIFY type enum('stripe', 'braintree', 'paypal', 'paytm', 'razorpay', 'paystack', 'payu', 'instamojo', 'flutterwave', 'paygate', 'mips', 'mercadopago', 'amazon', 'mytmoney', 'wayforpay', 'MyFatoorah', 'SberBank', 'BinancePay', 'OpenPix', 'link') NOT NULL;");
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query("ALTER TABLE payment_gateway MODIFY type enum('stripe', 'braintree', 'paypal', 'paytm', 'razorpay', 'paystack', 'payu', 'instamojo', 'flutterwave', 'paygate', 'mips', 'mercadopago', 'amazon', 'mytmoney', 'wayforpay', 'MyFatoorah', 'SberBank', 'link') NOT NULL;");
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1691157697552-add-binance-pay.js.map