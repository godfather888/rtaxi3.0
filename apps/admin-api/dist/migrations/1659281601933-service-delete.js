"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "serviceDelete1659281601933", {
    enumerable: true,
    get: function() {
        return serviceDelete1659281601933;
    }
});
let serviceDelete1659281601933 = class serviceDelete1659281601933 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE service ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch (error) {}
        try {
            await queryRunner.query('ALTER TABLE service_category ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch (error) {}
        try {
            await queryRunner.query('ALTER TABLE payment_gateway ADD COLUMN deletedAt DATETIME(6) NULL;');
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1659281601933-service-delete.js.map