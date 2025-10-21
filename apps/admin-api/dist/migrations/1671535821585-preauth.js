"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "preauth1671535821585", {
    enumerable: true,
    get: function() {
        return preauth1671535821585;
    }
});
let preauth1671535821585 = class preauth1671535821585 {
    async up(queryRunner) {
        try {
            await queryRunner.query(`alter table payment modify status enum('processing', 'authorized', 'success', 'canceled', 'failed') default 'processing' not null;`);
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query(`alter table payment ADD COLUMN externalReferenceNumber text NULL`);
        } catch (err) {}
    }
    async down(queryRunner) {
        try {
            await queryRunner.query(`alter table payment modify status enum('processing', 'success', 'canceled', 'failed') default 'processing' not null;`);
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('alter table payment drop column externalReferenceNumber');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1671535821585-preauth.js.map