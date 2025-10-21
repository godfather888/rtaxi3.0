"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayoutMethodCurrency1703408101869", {
    enumerable: true,
    get: function() {
        return PayoutMethodCurrency1703408101869;
    }
});
const _typeorm = require("typeorm");
let PayoutMethodCurrency1703408101869 = class PayoutMethodCurrency1703408101869 {
    async up(queryRunner) {
        try {
            await queryRunner.addColumn('payout_method', new _typeorm.TableColumn({
                name: 'currency',
                type: 'varchar'
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropColumn('payout_method', 'currency');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1703408101869-payout-method-currency.js.map