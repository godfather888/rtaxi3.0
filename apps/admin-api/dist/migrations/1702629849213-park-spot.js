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
    ParkSpotCarSize: function() {
        return ParkSpotCarSize;
    },
    ParkSpotFacility: function() {
        return ParkSpotFacility;
    },
    ParkingApp1702629849213: function() {
        return ParkingApp1702629849213;
    }
});
const _typeorm = require("typeorm");
var ParkSpotCarSize;
(function(ParkSpotCarSize) {
    ParkSpotCarSize["SMALL"] = "small";
    ParkSpotCarSize["MEDIUM"] = "medium";
    ParkSpotCarSize["LARGE"] = "large";
    ParkSpotCarSize["VERY_LARGE"] = "very_large";
})(ParkSpotCarSize || (ParkSpotCarSize = {}));
var ParkSpotFacility;
(function(ParkSpotFacility) {
    ParkSpotFacility["GUARDED"] = "guarded";
    ParkSpotFacility["COVERED"] = "covered";
    ParkSpotFacility["CCTV"] = "cctv";
    ParkSpotFacility["ELECTRIC_CHARGING"] = "electric_charging";
    ParkSpotFacility["CAR_WASH"] = "car_wash";
    ParkSpotFacility["TOILET"] = "toilet";
})(ParkSpotFacility || (ParkSpotFacility = {}));
let ParkingApp1702629849213 = class ParkingApp1702629849213 {
    async up(queryRunner) {
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'park_spot',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'rating',
                        type: 'tinyint',
                        isNullable: true
                    },
                    {
                        name: 'reviewCount',
                        type: 'smallint',
                        default: 0
                    },
                    {
                        name: 'openHour',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'closeHour',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'acceptNewRequest',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'acceptExtendRequest',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'carSize',
                        isNullable: true,
                        enumName: 'ParkSpotCarSize',
                        type: 'enum',
                        enum: Object.values(ParkSpotCarSize)
                    },
                    {
                        name: 'carPrice',
                        type: 'float',
                        isNullable: true,
                        default: 0,
                        precision: 12,
                        scale: 2
                    },
                    {
                        name: 'carSpaces',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'bikePrice',
                        type: 'float',
                        isNullable: true,
                        default: 0,
                        precision: 12,
                        scale: 2
                    },
                    {
                        name: 'bikeSpaces',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'truckPrice',
                        type: 'float',
                        isNullable: true,
                        default: 0,
                        precision: 12,
                        scale: 2
                    },
                    {
                        name: 'truckSpaces',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'currency',
                        type: 'varchar',
                        default: 'USD'
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'operatorName',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'operatorPhoneCountryCode',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'operatorPhoneNumber',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'facilities',
                        type: 'set',
                        enumName: 'ParkSpotFacility',
                        enum: Object.values(ParkSpotFacility)
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime'
                    },
                    {
                        name: 'updatedAt',
                        type: 'datetime',
                        isNullable: true
                    },
                    {
                        name: 'deletedAt',
                        type: 'datetime',
                        isNullable: true
                    }
                ]
            }), true, true, true);
        } catch (error) {
            console.error(error);
        }
    }
    async down() {}
};

//# sourceMappingURL=1702629849213-park-spot.js.map