"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userDeleteFeature1659110581464", {
    enumerable: true,
    get: function() {
        return userDeleteFeature1659110581464;
    }
});
let userDeleteFeature1659110581464 = class userDeleteFeature1659110581464 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE rider ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch (error) {}
        try {
            await queryRunner.query('ALTER TABLE driver ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1659110581464-user-delete-feature.js.map