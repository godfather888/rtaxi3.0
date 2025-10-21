"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RiderDriverTendencyFeature1701690556906", {
    enumerable: true,
    get: function() {
        return RiderDriverTendencyFeature1701690556906;
    }
});
const _typeorm = require("typeorm");
let RiderDriverTendencyFeature1701690556906 = class RiderDriverTendencyFeature1701690556906 {
    async up(queryRunner) {
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'rider_favorite_drivers_driver',
                columns: [
                    {
                        name: 'riderId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'driverId',
                        type: 'int',
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: [
                            'riderId'
                        ],
                        referencedTableName: 'rider',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    },
                    {
                        columnNames: [
                            'driverId'
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
                        columnNames: [
                            'riderId',
                            'driverId'
                        ],
                        isUnique: true
                    }
                ]
            }), true, true, true);
            await queryRunner.createTable(new _typeorm.Table({
                name: 'rider_blocked_drivers_driver',
                columns: [
                    {
                        name: 'riderId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'driverId',
                        type: 'int',
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: [
                            'riderId'
                        ],
                        referencedTableName: 'rider',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    },
                    {
                        columnNames: [
                            'driverId'
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
                        columnNames: [
                            'riderId',
                            'driverId'
                        ],
                        isUnique: true
                    }
                ]
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropTable('rider_favorite_drivers_driver');
            await queryRunner.dropTable('rider_blocked_drivers_driver');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1701690556906-rider-driver-tendency-feature.js.map