"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "trackOrderDestination1687333204169", {
    enumerable: true,
    get: function() {
        return trackOrderDestination1687333204169;
    }
});
let trackOrderDestination1687333204169 = class trackOrderDestination1687333204169 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` ADD `destinationArrivedTo` TINYINT NOT NULL DEFAULT 0');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` DROP `destinationArrivedTo`');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1687333204169-track-order-destination.js.map