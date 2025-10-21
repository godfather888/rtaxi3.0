"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DriverUploadRelation1698828623343", {
    enumerable: true,
    get: function() {
        return DriverUploadRelation1698828623343;
    }
});
let DriverUploadRelation1698828623343 = class DriverUploadRelation1698828623343 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `media` ADD `uploadedByDriverId` int NULL;');
            await queryRunner.query('ALTER TABLE `media` ADD FOREIGN KEY (`uploadedByDriverId`) REFERENCES `driver`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `media` DROP FOREIGN KEY `FK_5c4b6f0b4e0d9b8c7d5e6a1d9a9`;');
            await queryRunner.query('ALTER TABLE `media` DROP COLUMN `uploadedByDriverId`;');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1698828623343-driver-upload-relation.js.map