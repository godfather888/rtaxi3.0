"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "serviceOptionManyToMany1665141463615", {
    enumerable: true,
    get: function() {
        return serviceOptionManyToMany1665141463615;
    }
});
let serviceOptionManyToMany1665141463615 = class serviceOptionManyToMany1665141463615 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `service_option` DROP COLUMN `serviceId`;');
        } catch (error) {}
        try {
            await queryRunner.query('CREATE TABLE `service_options_service_option` (`serviceId` int NOT NULL, `serviceOptionId` int NOT NULL, PRIMARY KEY (`serviceId`,`serviceOptionId`), FOREIGN KEY (`serviceOptionId`) REFERENCES `service_option` (`id`), FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);');
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1665141463615-service-option-many-to-many.js.map