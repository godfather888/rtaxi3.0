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
    SMSProviderType: function() {
        return SMSProviderType;
    },
    VentisSmsProvider1743253993497: function() {
        return VentisSmsProvider1743253993497;
    }
});
const _typeorm = require("typeorm");
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
let VentisSmsProvider1743253993497 = class VentisSmsProvider1743253993497 {
    async up(queryRunner) {
        await queryRunner.changeColumn('sms_provider', 'type', new _typeorm.TableColumn({
            name: 'type',
            type: 'enum',
            enum: Object.values(SMSProviderType)
        }));
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1743253993497-ventis-sms-provider.js.map