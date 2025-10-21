"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RiderReviewFeature1701623200931", {
    enumerable: true,
    get: function() {
        return RiderReviewFeature1701623200931;
    }
});
const _typeorm = require("typeorm");
let RiderReviewFeature1701623200931 = class RiderReviewFeature1701623200931 {
    async up(queryRunner) {
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'rider_review',
                columns: [
                    new _typeorm.TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    }),
                    new _typeorm.TableColumn({
                        name: 'score',
                        type: 'tinyint'
                    }),
                    new _typeorm.TableColumn({
                        name: 'review',
                        type: 'varchar',
                        isNullable: true
                    }),
                    new _typeorm.TableColumn({
                        name: 'riderId',
                        type: 'int'
                    }),
                    new _typeorm.TableColumn({
                        name: 'driverId',
                        type: 'int'
                    }),
                    new _typeorm.TableColumn({
                        name: 'orderId',
                        type: 'int'
                    })
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
                    },
                    {
                        columnNames: [
                            'orderId'
                        ],
                        referencedTableName: 'request',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    }
                ],
                indices: [
                    {
                        columnNames: [
                            'riderId'
                        ]
                    },
                    {
                        columnNames: [
                            'driverId'
                        ]
                    },
                    {
                        columnNames: [
                            'orderId'
                        ]
                    }
                ]
            }), true, true, true);
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropTable('rider_review');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1701623200931-rider-review-feature.js.map