"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FleetMultiplier1667823225617", {
    enumerable: true,
    get: function() {
        return FleetMultiplier1667823225617;
    }
});
let FleetMultiplier1667823225617 = class FleetMultiplier1667823225617 {
    async up(queryRunner) {
        try {
            await queryRunner.query(`ALTER TABLE fleet ADD COLUMN feeMultiplier FLOAT(10,2) NULL;`);
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1667823225617-fleet-muliplier.js.map