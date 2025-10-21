"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DriverDirections1702211821170", {
    enumerable: true,
    get: function() {
        return DriverDirections1702211821170;
    }
});
const _typeorm = require("typeorm");
let DriverDirections1702211821170 = class DriverDirections1702211821170 {
    async up(queryRunner) {
        try {
            await queryRunner.addColumn('request', new _typeorm.TableColumn({
                name: 'driverDirections',
                type: 'multipoint',
                isNullable: true
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropColumn('request', 'driverDirections');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1702211821170-driver-directions.js.map