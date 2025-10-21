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
    PayoutSession1703444461480: function() {
        return PayoutSession1703444461480;
    },
    PayoutSessionStatus: function() {
        return PayoutSessionStatus;
    }
});
const _typeorm = require("typeorm");
var PayoutSessionStatus;
(function(PayoutSessionStatus) {
    PayoutSessionStatus["PENDING"] = "pending";
    PayoutSessionStatus["IN_PROGRESS"] = "in_progress";
    PayoutSessionStatus["PAID"] = "paid";
    PayoutSessionStatus["FAILED"] = "failed";
    PayoutSessionStatus["CANCELLED"] = "cancelled";
})(PayoutSessionStatus || (PayoutSessionStatus = {}));
let PayoutSession1703444461480 = class PayoutSession1703444461480 {
    async up(queryRunner) {
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'payout_session',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime',
                        default: 'NOW()'
                    },
                    {
                        name: 'processedAt',
                        type: 'datetime',
                        isNullable: true
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: Object.values(PayoutSessionStatus),
                        default: "'pending'"
                    },
                    {
                        name: 'totalAmount',
                        type: 'float',
                        default: 0,
                        precision: 10,
                        scale: 2
                    },
                    {
                        name: 'currency',
                        type: 'varchar'
                    },
                    {
                        name: 'createdByOperatorId',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: [
                            'createdByOperatorId'
                        ],
                        referencedTableName: 'operator',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    }
                ],
                indices: [
                    {
                        columnNames: [
                            'createdByOperatorId'
                        ]
                    }
                ]
            }), true, true, true);
        } catch (error) {
            console.error('Error creating payout_session table:', error);
        }
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'payout_session_payout_methods_payout_method',
                columns: [
                    {
                        name: 'payoutSessionId',
                        type: 'int'
                    },
                    {
                        name: 'payoutMethodId',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: [
                            'payoutSessionId'
                        ],
                        referencedTableName: 'payout_session',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    },
                    {
                        columnNames: [
                            'payoutMethodId'
                        ],
                        referencedTableName: 'payout_method',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    }
                ],
                indices: [
                    {
                        columnNames: [
                            'payoutSessionId'
                        ]
                    },
                    {
                        columnNames: [
                            'payoutMethodId'
                        ]
                    }
                ]
            }));
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.addColumn('driver_transaction', new _typeorm.TableColumn({
                name: 'payoutSessionId',
                type: 'int',
                isNullable: true
            }));
            await queryRunner.addColumn('driver_transaction', new _typeorm.TableColumn({
                name: 'payoutAccountId',
                type: 'int',
                isNullable: true
            }));
            await queryRunner.addColumn('driver_transaction', new _typeorm.TableColumn({
                name: 'payoutMethodId',
                type: 'int',
                isNullable: true
            }));
            await queryRunner.createForeignKey('driver_transaction', new _typeorm.TableForeignKey({
                columnNames: [
                    'payoutSessionId'
                ],
                referencedTableName: 'payout_session',
                referencedColumnNames: [
                    'id'
                ],
                onDelete: 'CASCADE'
            }));
            await queryRunner.createForeignKey('driver_transaction', new _typeorm.TableForeignKey({
                columnNames: [
                    'payoutAccountId'
                ],
                referencedTableName: 'payout_account',
                referencedColumnNames: [
                    'id'
                ],
                onDelete: 'CASCADE'
            }));
            await queryRunner.createForeignKey('driver_transaction', new _typeorm.TableForeignKey({
                columnNames: [
                    'payoutMethodId'
                ],
                referencedTableName: 'payout_method',
                referencedColumnNames: [
                    'id'
                ],
                onDelete: 'CASCADE'
            }));
            await queryRunner.createIndex('driver_transaction', new _typeorm.TableIndex({
                columnNames: [
                    'payoutSessionId'
                ]
            }));
            await queryRunner.createIndex('driver_transaction', new _typeorm.TableIndex({
                columnNames: [
                    'payoutAccountId'
                ]
            }));
            await queryRunner.createIndex('driver_transaction', new _typeorm.TableIndex({
                columnNames: [
                    'payoutMethodId'
                ]
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropTable('payout_session');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1703444461480-payout-session.js.map