"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "myfatoorahGateway1662795193253", {
    enumerable: true,
    get: function() {
        return myfatoorahGateway1662795193253;
    }
});
let myfatoorahGateway1662795193253 = class myfatoorahGateway1662795193253 {
    async up(queryRunner) {
        try {
            await queryRunner.query("ALTER TABLE payment_gateway MODIFY type enum('stripe', 'braintree', 'paypal', 'paytm', 'razorpay', 'paystack', 'payu', 'instamojo', 'flutterwave', 'paygate', 'mips', 'mercadopago', 'amazon', 'mytmoney', 'wayforpay', 'MyFatoorah', 'link') NOT NULL;");
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1662795193253-myfatoorah-gateway.js.map