"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CostBreakdown1701614737266", {
    enumerable: true,
    get: function() {
        return CostBreakdown1701614737266;
    }
});
const _typeorm = require("typeorm");
let CostBreakdown1701614737266 = class CostBreakdown1701614737266 {
    async up(queryRunner) {
        try {
            await queryRunner.addColumn('request', new _typeorm.TableColumn({
                name: 'waitCost',
                type: 'float',
                precision: 10,
                scale: 2,
                default: 0
            }));
            await queryRunner.addColumn('request', new _typeorm.TableColumn({
                name: 'rideOptionsCost',
                type: 'float',
                precision: 10,
                scale: 2,
                default: 0
            }));
            await queryRunner.addColumn('request', new _typeorm.TableColumn({
                name: 'taxCost',
                type: 'float',
                precision: 10,
                scale: 2,
                default: 0
            }));
            await queryRunner.addColumn('request', new _typeorm.TableColumn({
                name: 'serviceCost',
                type: 'float',
                precision: 10,
                scale: 2,
                default: 0
            }));
        } catch (e) {
            console.log(e);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropColumn('request', 'waitCost');
            await queryRunner.dropColumn('request', 'rideOptionsCost');
            await queryRunner.dropColumn('request', 'taxCost');
            await queryRunner.dropColumn('request', 'serviceCost');
        } catch (e) {
            console.log(e);
        }
    }
};

//# sourceMappingURL=1701614737266-cost-breakdown.js.map