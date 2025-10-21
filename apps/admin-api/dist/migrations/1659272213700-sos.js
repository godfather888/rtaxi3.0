"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sos1659272213700", {
    enumerable: true,
    get: function() {
        return sos1659272213700;
    }
});
let sos1659272213700 = class sos1659272213700 {
    async up(queryRunner) {
        try {
            await queryRunner.query("CREATE TABLE `sos` (`id` int NOT NULL PRIMARY KEY AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `status` enum('Submitted','UnderReview','FalseAlarm','Resolved') NOT NULL DEFAULT 'Submitted', `requestId` int NOT NULL, `location` point DEFAULT NULL, `submittedByRider` tinyint NOT NULL, FOREIGN KEY (`requestId`) REFERENCES `request` (`id`));");
        } catch (error) {}
        try {
            await queryRunner.query("CREATE TABLE `sos_activity` ( `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `action` enum('Submitted','Seen','ContactDriver','ContactAuthorities','MarkedAsResolved','MarkedAsFalseAlarm') NOT NULL, `note` varchar(2000) NOT NULL, `operatorId` int DEFAULT NULL, `sosId` int NOT NULL, FOREIGN KEY (`operatorId`) REFERENCES `operator` (`id`), FOREIGN KEY (`sosId`) REFERENCES `sos` (`id`))");
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1659272213700-sos.js.map