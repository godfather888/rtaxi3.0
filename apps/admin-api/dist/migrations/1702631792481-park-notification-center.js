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
    ParkNotificationCenter1702631792481: function() {
        return ParkNotificationCenter1702631792481;
    },
    ParkingCustomerNotificationType: function() {
        return ParkingCustomerNotificationType;
    },
    ParkingProviderNotificationType: function() {
        return ParkingProviderNotificationType;
    }
});
const _typeorm = require("typeorm");
var ParkingCustomerNotificationType;
(function(ParkingCustomerNotificationType) {
    ParkingCustomerNotificationType["booked"] = "booked";
    ParkingCustomerNotificationType["cancelled"] = "cancelled";
    ParkingCustomerNotificationType["expiring"] = "expiring";
    ParkingCustomerNotificationType["rate"] = "rate";
})(ParkingCustomerNotificationType || (ParkingCustomerNotificationType = {}));
var ParkingProviderNotificationType;
(function(ParkingProviderNotificationType) {
    ParkingProviderNotificationType["booked"] = "booked";
    ParkingProviderNotificationType["cancelled"] = "cancelled";
    ParkingProviderNotificationType["expiring"] = "expiring";
})(ParkingProviderNotificationType || (ParkingProviderNotificationType = {}));
let ParkNotificationCenter1702631792481 = class ParkNotificationCenter1702631792481 {
    async up(queryRunner) {
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'parking_customer_notification',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: Object.values(ParkingCustomerNotificationType)
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime'
                    },
                    {
                        name: 'expireAt',
                        type: 'datetime',
                        isNullable: true
                    },
                    {
                        name: 'parkOrderId',
                        type: 'int'
                    },
                    {
                        name: 'customerId',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'parking_customer_notification_park_order_id_fk',
                        columnNames: [
                            'parkOrderId'
                        ],
                        referencedTableName: 'park_order',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    },
                    {
                        name: 'parking_customer_notification_customer_id_fk',
                        columnNames: [
                            'customerId'
                        ],
                        referencedTableName: 'rider',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    }
                ],
                indices: [
                    {
                        name: 'parking_customer_notification_park_order_id_idx',
                        columnNames: [
                            'parkOrderId'
                        ]
                    },
                    {
                        name: 'parking_customer_notification_customer_id_idx',
                        columnNames: [
                            'customerId'
                        ]
                    }
                ]
            }));
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'parking_provider_notification',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: Object.values(ParkingProviderNotificationType)
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime'
                    },
                    {
                        name: 'expireAt',
                        type: 'datetime',
                        isNullable: true
                    },
                    {
                        name: 'parkOrderId',
                        type: 'int'
                    },
                    {
                        name: 'providerId',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'parking_provider_notification_park_order_id_fk',
                        columnNames: [
                            'parkOrderId'
                        ],
                        referencedTableName: 'park_order',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    },
                    {
                        name: 'parking_provider_notification_provider_id_fk',
                        columnNames: [
                            'providerId'
                        ],
                        referencedTableName: 'driver',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    }
                ],
                indices: [
                    {
                        name: 'parking_provider_notification_park_order_id_idx',
                        columnNames: [
                            'parkOrderId'
                        ]
                    },
                    {
                        name: 'parking_provider_notification_provider_id_idx',
                        columnNames: [
                            'providerId'
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

//# sourceMappingURL=1702631792481-park-notification-center.js.map