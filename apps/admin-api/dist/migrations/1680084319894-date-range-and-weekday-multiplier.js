"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dateRangeAndWeekdayMultiplier1680084319894", {
    enumerable: true,
    get: function() {
        return dateRangeAndWeekdayMultiplier1680084319894;
    }
});
let dateRangeAndWeekdayMultiplier1680084319894 = class dateRangeAndWeekdayMultiplier1680084319894 {
    async up(queryRunner) {
        try {
            await queryRunner.query(`ALTER TABLE service ADD COLUMN dateRangeMultipliers TEXT NULL;`);
        } catch (exception) {}
        try {
            await queryRunner.query(`ALTER TABLE service ADD COLUMN weekdayMultipliers TEXT NULL;`);
        } catch (exception) {}
    }
    async down(queryRunner) {
        try {
            await queryRunner.query(`ALTER TABLE service DROP COLUMN dateRangeMultipliers;`);
        } catch (exception) {}
        try {
            await queryRunner.query(`ALTER TABLE service DROP COLUMN weekdayMultipliers;`);
        } catch (exception) {}
    }
};

//# sourceMappingURL=1680084319894-date-range-and-weekday-multiplier.js.map