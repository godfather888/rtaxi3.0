"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SavedPaymentMethod1698828086720", {
    enumerable: true,
    get: function() {
        return SavedPaymentMethod1698828086720;
    }
});
let SavedPaymentMethod1698828086720 = class SavedPaymentMethod1698828086720 {
    async up(queryRunner) {
        try {
            await queryRunner.query("CREATE TABLE `saved_payment_method` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `title` varchar(255) NOT NULL, `type` enum('CARD','BANK_ACCOUNT') NOT NULL, `providerBrand` enum('visa','mastercard','amex','discover','diners','eftpos_au','jcb','unionpay','unknown') DEFAULT NULL, `expiryDate` datetime DEFAULT NULL, `holderName` varchar(255) DEFAULT NULL, `riderId` int DEFAULT NULL, `driverId` int DEFAULT NULL, `token` varchar(255) NOT NULL, `paymentGatewayId` int NOT NULL, FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`), FOREIGN KEY (`riderId`) REFERENCES `rider` (`id`), FOREIGN KEY (`paymentGatewayId`) REFERENCES `payment_gateway` (`id`));");
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('DROP TABLE `saved_payment_method`');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1698828086720-saved-payment-method.js.map