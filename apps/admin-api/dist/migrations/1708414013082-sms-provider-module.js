"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    OperatorPermission: function() {
        return OperatorPermission;
    },
    SMSProviderType: function() {
        return SMSProviderType;
    },
    SmsProviderModule1708414013082: function() {
        return SmsProviderModule1708414013082;
    }
});
const _typeorm = require("typeorm");
const _fs = require("fs");
var SMSProviderType;
(function(SMSProviderType) {
    SMSProviderType["Firebase"] = "Firebase";
    SMSProviderType["Twilio"] = "Twilio";
    SMSProviderType["Plivo"] = "Plivo";
    SMSProviderType["Pahappa"] = "Pahappa";
    SMSProviderType["BroadNet"] = "BroadNet";
    SMSProviderType["Vonage"] = "Vonage";
    SMSProviderType["ClickSend"] = "ClickSend";
    SMSProviderType["Infobip"] = "Infobip";
    SMSProviderType["MessageBird"] = "MessageBird";
    SMSProviderType["VentisSMS"] = "VentisSMS";
})(SMSProviderType || (SMSProviderType = {}));
var OperatorPermission;
(function(OperatorPermission) {
    OperatorPermission["Drivers_View"] = "Drivers_View";
    OperatorPermission["Drivers_Edit"] = "Drivers_Edit";
    OperatorPermission["Riders_View"] = "Riders_View";
    OperatorPermission["Riders_Edit"] = "Riders_Edit";
    OperatorPermission["Regions_View"] = "Regions_View";
    OperatorPermission["Regions_Edit"] = "Regions_Edit";
    OperatorPermission["Services_View"] = "Services_View";
    OperatorPermission["Services_Edit"] = "Services_Edit";
    OperatorPermission["Complaints_View"] = "Complaints_View";
    OperatorPermission["Complaints_Edit"] = "Complaints_Edit";
    OperatorPermission["Coupons_View"] = "Coupons_View";
    OperatorPermission["Coupons_Edit"] = "Coupons_Edit";
    OperatorPermission["Announcements_View"] = "Announcements_View";
    OperatorPermission["Announcements_Edit"] = "Announcements_Edit";
    OperatorPermission["Requests_View"] = "Requests_View";
    OperatorPermission["Fleets_View"] = "Fleets_View";
    OperatorPermission["Fleets_Edit"] = "Fleets_Edit";
    OperatorPermission["Gateways_View"] = "Gateways_View";
    OperatorPermission["Gateways_Edit"] = "Gateways_Edit";
    OperatorPermission["Users_View"] = "Users_View";
    OperatorPermission["Users_Edit"] = "Users_Edit";
    OperatorPermission["Cars_View"] = "Cars_View";
    OperatorPermission["Cars_Edit"] = "Cars_Edit";
    OperatorPermission["FleetWallet_View"] = "FleetWallet_View";
    OperatorPermission["FleetWallet_Edit"] = "FleetWallet_Edit";
    OperatorPermission["ProviderWallet_View"] = "ProviderWallet_View";
    OperatorPermission["ProviderWallet_Edit"] = "ProviderWallet_Edit";
    OperatorPermission["DriverWallet_View"] = "DriverWallet_View";
    OperatorPermission["DriverWallet_Edit"] = "DriverWallet_Edit";
    OperatorPermission["RiderWallet_View"] = "RiderWallet_View";
    OperatorPermission["RiderWallet_Edit"] = "RiderWallet_Edit";
    OperatorPermission["ReviewParameter_Edit"] = "ReviewParameter_Edit";
    OperatorPermission["Payouts_View"] = "Payouts_View";
    OperatorPermission["Payouts_Edit"] = "Payouts_Edit";
    OperatorPermission["GiftBatch_View"] = "GiftBatch_View";
    OperatorPermission["GiftBatch_Create"] = "GiftBatch_Create";
    OperatorPermission["GiftBatch_ViewCodes"] = "GiftBatch_ViewCodes";
    OperatorPermission["SMSProviders_View"] = "SMSProviders_View";
    OperatorPermission["SMSProviders_Edit"] = "SMSProviders_Edit";
})(OperatorPermission || (OperatorPermission = {}));
let SmsProviderModule1708414013082 = class SmsProviderModule1708414013082 {
    async up(queryRunner) {
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'sms_provider',
                columns: [
                    new _typeorm.TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    }),
                    new _typeorm.TableColumn({
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    }),
                    new _typeorm.TableColumn({
                        name: 'type',
                        type: 'enum',
                        enum: Object.values(SMSProviderType),
                        isNullable: false
                    }),
                    new _typeorm.TableColumn({
                        name: 'isDefault',
                        type: 'boolean',
                        isNullable: false,
                        default: false
                    }),
                    new _typeorm.TableColumn({
                        name: 'accountId',
                        type: 'varchar',
                        isNullable: true
                    }),
                    new _typeorm.TableColumn({
                        name: 'authToken',
                        type: 'varchar',
                        isNullable: true
                    }),
                    new _typeorm.TableColumn({
                        name: 'fromNumber',
                        type: 'varchar',
                        isNullable: true
                    }),
                    new _typeorm.TableColumn({
                        name: 'verificationTemplate',
                        type: 'text',
                        isNullable: true
                    }),
                    new _typeorm.TableColumn({
                        name: 'smsType',
                        type: 'varchar',
                        isNullable: true
                    }),
                    new _typeorm.TableColumn({
                        name: 'createdAt',
                        type: 'datetime',
                        default: 'NOW()'
                    }),
                    new _typeorm.TableColumn({
                        name: 'deletedAt',
                        type: 'datetime',
                        isNullable: true
                    })
                ]
            }), true);
            const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
            if ((0, _fs.existsSync)(configAddress)) {
                const file = await _fs.promises.readFile(configAddress, {
                    encoding: 'utf-8'
                });
                const config = JSON.parse(file);
                if (config.twilioAccountSid && config.twilioAuthToken && config.twilioFromNumber && config.twilioVerificationCodeSMSTemplate) {
                    await queryRunner.query(`INSERT INTO sms_provider (name, type, isDefault, accountId, authToken, fromNumber, verificationTemplate, smsType) VALUES ('Twilio', 'Twilio', 1, '${config.twilioAccountSid}', '${config.twilioAuthToken}', '${config.twilioFromNumber}', '${config.twilioVerificationCodeSMSTemplate}', null)`);
                }
            }
            await queryRunner.changeColumn('operator_role', 'permissions', new _typeorm.TableColumn({
                name: 'permissions',
                type: 'set',
                enum: Object.values(OperatorPermission)
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropTable('sms_provider');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1708414013082-sms-provider-module.js.map