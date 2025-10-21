"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "connectTaxiOrderEntityToFleet1678085941522", {
    enumerable: true,
    get: function() {
        return connectTaxiOrderEntityToFleet1678085941522;
    }
});
let connectTaxiOrderEntityToFleet1678085941522 = class connectTaxiOrderEntityToFleet1678085941522 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` ADD `fleetId` int NULL');
            await queryRunner.query('ALTER TABLE `request` ADD FOREIGN KEY (`fleetId`) REFERENCES `fleet` (`id`)');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` DROP COLUMN `fleetId`');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1678085941522-connect-request-entity-to-fleet.js.map