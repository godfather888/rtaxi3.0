"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "twoWayTripFeature1643813472603", {
    enumerable: true,
    get: function() {
        return twoWayTripFeature1643813472603;
    }
});
let twoWayTripFeature1643813472603 = class twoWayTripFeature1643813472603 {
    async up(queryRunner) {
        try {
            await queryRunner.query(`ALTER TABLE service ADD COLUMN twoWayAvailable TINYINT DEFAULT FALSE;`);
        } catch (exception) {}
        try {
            await queryRunner.query(`ALTER TABLE service ADD COLUMN perMinuteWait FLOAT(12,2) DEFAULT 0.00;`);
        } catch (exception) {}
        try {
            await queryRunner.query(`ALTER TABLE request ADD COLUMN waitTime INT DEFAULT 0;`);
        } catch (exception) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1643813472603-twoWayTripFeature.js.map