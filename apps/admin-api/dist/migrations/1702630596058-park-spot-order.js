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
    ParkOrderStatus: function() {
        return ParkOrderStatus;
    },
    ParkSpotCarSize: function() {
        return ParkSpotCarSize;
    },
    ParkSpotOrder1702630596058: function() {
        return ParkSpotOrder1702630596058;
    },
    ParkSpotVehicleType: function() {
        return ParkSpotVehicleType;
    },
    PaymentMode: function() {
        return PaymentMode;
    }
});
const _typeorm = require("typeorm");
var ParkOrderStatus;
(function(ParkOrderStatus) {
    ParkOrderStatus["PENDING"] = "pending";
    ParkOrderStatus["PAID"] = "paid";
    ParkOrderStatus["CANCELLED"] = "cancelled";
    ParkOrderStatus["ACCEPTED"] = "accepted";
    ParkOrderStatus["REJECTED"] = "rejected";
    ParkOrderStatus["COMPLETED"] = "completed";
})(ParkOrderStatus || (ParkOrderStatus = {}));
var ParkSpotCarSize;
(function(ParkSpotCarSize) {
    ParkSpotCarSize["SMALL"] = "small";
    ParkSpotCarSize["MEDIUM"] = "medium";
    ParkSpotCarSize["LARGE"] = "large";
    ParkSpotCarSize["VERY_LARGE"] = "very_large";
})(ParkSpotCarSize || (ParkSpotCarSize = {}));
var ParkSpotVehicleType;
(function(ParkSpotVehicleType) {
    ParkSpotVehicleType["Car"] = "car";
    ParkSpotVehicleType["Bike"] = "bike";
    ParkSpotVehicleType["Truck"] = "truck";
})(ParkSpotVehicleType || (ParkSpotVehicleType = {}));
var PaymentMode;
(function(PaymentMode) {
    PaymentMode["Cash"] = "cash";
    PaymentMode["SavedPaymentMethod"] = "savedPaymentMethod";
    PaymentMode["PaymentGateway"] = "paymentGateway";
    PaymentMode["Wallet"] = "wallet";
})(PaymentMode || (PaymentMode = {}));
let ParkSpotOrder1702630596058 = class ParkSpotOrder1702630596058 {
    async up(queryRunner) {
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'park_order',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'spotOwnerId',
                        type: 'int'
                    },
                    {
                        name: 'carOwnerId',
                        type: 'int'
                    },
                    {
                        name: 'parkSpotId',
                        type: 'int'
                    },
                    {
                        name: 'vehicleType',
                        type: 'enum',
                        enum: Object.values(ParkSpotVehicleType),
                        default: "'Car'"
                    },
                    {
                        name: 'carSize',
                        type: 'enum',
                        enum: Object.values(ParkSpotCarSize),
                        isNullable: true
                    },
                    {
                        name: 'enterTime',
                        type: 'datetime'
                    },
                    {
                        name: 'exitTime',
                        type: 'datetime'
                    },
                    {
                        name: 'paymentMode',
                        type: 'enum',
                        enum: Object.values(PaymentMode)
                    },
                    {
                        name: 'price',
                        type: 'float',
                        default: 0,
                        precision: 12,
                        scale: 2
                    },
                    {
                        name: 'extendedExitTime',
                        type: 'datetime'
                    },
                    {
                        name: 'savedPaymentMethodId',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'paymentGatewayId',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: Object.values(ParkOrderStatus)
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'park_order_spot_owner_id',
                        columnNames: [
                            'spotOwnerId'
                        ],
                        referencedTableName: 'park_spot',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'SET NULL'
                    },
                    {
                        name: 'park_order_car_owner_id',
                        columnNames: [
                            'carOwnerId'
                        ],
                        referencedTableName: 'rider',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'SET NULL'
                    },
                    {
                        name: 'park_order_park_spot_id',
                        columnNames: [
                            'parkSpotId'
                        ],
                        referencedTableName: 'park_spot',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    },
                    {
                        name: 'park_order_saved_payment_method_id',
                        columnNames: [
                            'savedPaymentMethodId'
                        ],
                        referencedTableName: 'saved_payment_method',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'SET NULL'
                    },
                    {
                        name: 'park_order_payment_gateway_id',
                        columnNames: [
                            'paymentGatewayId'
                        ],
                        referencedTableName: 'payment_gateway',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'SET NULL'
                    }
                ],
                indices: [
                    {
                        name: 'park_order_spot_owner_id',
                        columnNames: [
                            'spotOwnerId'
                        ]
                    },
                    {
                        name: 'park_order_car_owner_id',
                        columnNames: [
                            'carOwnerId'
                        ]
                    },
                    {
                        name: 'park_order_park_spot_id',
                        columnNames: [
                            'parkSpotId'
                        ]
                    },
                    {
                        name: 'park_order_saved_payment_method_id',
                        columnNames: [
                            'savedPaymentMethodId'
                        ]
                    },
                    {
                        name: 'park_order_payment_gateway_id',
                        columnNames: [
                            'paymentGatewayId'
                        ]
                    }
                ]
            }), true, true, true);
        } catch (error) {
            console.error(error);
        }
    }
    async down() {}
};

//# sourceMappingURL=1702630596058-park-spot-order.js.map