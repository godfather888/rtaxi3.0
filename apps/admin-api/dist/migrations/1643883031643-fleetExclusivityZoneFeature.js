"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fleetExclusivityZoneFeature1643883031643", {
    enumerable: true,
    get: function() {
        return fleetExclusivityZoneFeature1643883031643;
    }
});
let fleetExclusivityZoneFeature1643883031643 = class fleetExclusivityZoneFeature1643883031643 {
    async up(queryRunner) {
        try {
            await queryRunner.query(`ALTER TABLE fleet ADD COLUMN exclusivityAreas POLYGON NULL;`);
        } catch (exception) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1643883031643-fleetExclusivityZoneFeature.js.map