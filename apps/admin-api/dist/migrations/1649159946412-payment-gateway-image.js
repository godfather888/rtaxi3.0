"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "paymentGatewayImage1649159946412", {
    enumerable: true,
    get: function() {
        return paymentGatewayImage1649159946412;
    }
});
let paymentGatewayImage1649159946412 = class paymentGatewayImage1649159946412 {
    async up(queryRunner) {
        try {
            await queryRunner.query(`ALTER TABLE payment_gateway ADD COLUMN mediaId INT NULL;`);
            await queryRunner.query('ALTER TABLE payment_gateway ADD FOREIGN KEY (mediaId) REFERENCES media(id);');
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1649159946412-payment-gateway-image.js.map