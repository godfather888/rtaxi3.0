"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "paymentGatewayTypes1648804740118", {
    enumerable: true,
    get: function() {
        return paymentGatewayTypes1648804740118;
    }
});
let paymentGatewayTypes1648804740118 = class paymentGatewayTypes1648804740118 {
    async up(queryRunner) {
        try {
            await queryRunner.query(`ALTER TABLE payment_gateway MODIFY COLUMN type enum('stripe','braintree','paypal','paytm','razorpay','paystack','payu','instamojo','flutterwave','paygate','mips','mercadopago','amazon','mytmoney','wayforpay','link') NOT NULL;`);
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1648804740118-payment-gateway-types.js.map