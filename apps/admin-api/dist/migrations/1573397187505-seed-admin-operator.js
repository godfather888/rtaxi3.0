"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedAdminOperator1573397187505", {
    enumerable: true,
    get: function() {
        return seedAdminOperator1573397187505;
    }
});
let seedAdminOperator1573397187505 = class seedAdminOperator1573397187505 {
    async up(queryRunner) {
        try {
            await queryRunner.query(`INSERT INTO operator_role (title, permissions) VALUES ('admin', 'Drivers_View,Drivers_Edit,Riders_View,Riders_Edit,Regions_View,Regions_Edit,Services_View,Services_Edit,Complaints_View,Complaints_Edit,Coupons_View,Coupons_Edit,Announcements_View,Announcements_Edit,Requests_View,Fleets_View,Fleets_Edit,Gateways_View,Gateways_Edit,Users_View,Users_Edit,Cars_View,Cars_Edit,FleetWallet_View,FleetWallet_Edit,ProviderWallet_View,ProviderWallet_Edit,DriverWallet_View,DriverWallet_Edit,RiderWallet_View,RiderWallet_Edit,ReviewParameter_Edit,Payouts_View,Payouts_Edit,GiftBatch_View,GiftBatch_Create,GiftBatch_ViewCodes,SMSProviders_View,SMSProviders_Edit');`);
            await queryRunner.query(`INSERT INTO operator (userName, password,firstName, lastName, roleId) VALUES ('admin', 'admin', 'John', 'Doe', 1);`);
        } catch (error) {
            console.error('Error occurred while seeding admin operator:', error);
        }
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1573397187505-seed-admin-operator.js.map