"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "roundingFactor1647681770243", {
    enumerable: true,
    get: function() {
        return roundingFactor1647681770243;
    }
});
let roundingFactor1647681770243 = class roundingFactor1647681770243 {
    async up(queryRunner) {
        try {
            return await queryRunner.query(`ALTER TABLE service ADD COLUMN roundingFactor FLOAT(10,2) NULL;`);
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1647681770243-rounding-factor.js.map