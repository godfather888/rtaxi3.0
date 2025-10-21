"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "zonePrice1670742105412", {
    enumerable: true,
    get: function() {
        return zonePrice1670742105412;
    }
});
let zonePrice1670742105412 = class zonePrice1670742105412 {
    async up(queryRunner) {
        try {
            await queryRunner.query("CREATE TABLE `zone_price` (`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(255) NOT NULL, `cost` float(10,2) NOT NULL DEFAULT '0.00', `timeMultipliers` text, `from` polygon NOT NULL, `to` polygon NOT NULL);");
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('CREATE TABLE `zone_price_fleets_fleet` (`zonePriceId` int NOT NULL,`fleetId` int NOT NULL, PRIMARY KEY (`zonePriceId`,`fleetId`), FOREIGN KEY (`fleetId`) REFERENCES `fleet` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (`zonePriceId`) REFERENCES `zone_price` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION);');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('CREATE TABLE `zone_price_services_service` (`zonePriceId` int NOT NULL, `serviceId` int NOT NULL, PRIMARY KEY (`zonePriceId`,`serviceId`), FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (`zonePriceId`) REFERENCES `zone_price` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION);');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1670742105412-zone-price.js.map