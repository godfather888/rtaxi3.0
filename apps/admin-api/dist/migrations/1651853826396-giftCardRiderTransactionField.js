"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "giftCardRiderTransactionField1651853826396", {
    enumerable: true,
    get: function() {
        return giftCardRiderTransactionField1651853826396;
    }
});
let giftCardRiderTransactionField1651853826396 = class giftCardRiderTransactionField1651853826396 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE rider_transaction ADD COLUMN giftCardId INT NULL;');
        } catch (error) {}
        try {
            await queryRunner.query('ALTER TABLE rider_transaction ADD FOREIGN KEY (giftCardId) REFERENCES gift_card(id);');
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1651853826396-giftCardRiderTransactionField.js.map