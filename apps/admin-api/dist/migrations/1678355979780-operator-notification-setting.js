"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "operatorNotificationSetting1678355979780", {
    enumerable: true,
    get: function() {
        return operatorNotificationSetting1678355979780;
    }
});
let operatorNotificationSetting1678355979780 = class operatorNotificationSetting1678355979780 {
    async up(queryRunner) {
        try {
            await queryRunner.query("ALTER TABLE `operator` ADD COLUMN `enabledNotifications` SET('sos','complaint','order','driverSubmittedDocs') NOT NULL DEFAULT 'sos,complaint,driverSubmittedDocs'");
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `operator` DROP COLUMN `enabledNotifications`');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1678355979780-operator-notification-setting.js.map