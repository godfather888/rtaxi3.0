"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PayoutAccountFeature1701977160261", {
    enumerable: true,
    get: function() {
        return PayoutAccountFeature1701977160261;
    }
});
const _typeorm = require("typeorm");
let PayoutAccountFeature1701977160261 = class PayoutAccountFeature1701977160261 {
    async up(queryRunner) {
        try {
            await queryRunner.createTable(new _typeorm.Table({
                name: 'payout_account',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'driverId',
                        type: 'int'
                    },
                    {
                        name: 'paymentGatewayId',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountNumber',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'routingNumber',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountHolderName',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'bankName',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'isDefault',
                        type: 'boolean',
                        default: false
                    },
                    {
                        name: 'isVerified',
                        type: 'boolean',
                        default: false
                    },
                    {
                        name: 'branchName',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountHolderAddress',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountHolderCity',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountHolderState',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountHolderZip',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountHolderCountry',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountHolderPhone',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accountHolderDateOfBirth',
                        type: 'datetime',
                        isNullable: true
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime',
                        default: 'NOW()'
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
                ],
                foreignKeys: [
                    {
                        name: 'FK_payout_account_driver',
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
                        name: 'FK_payout_account_payment_gateway',
                        columnNames: [
                            'paymentGatewayId'
                        ],
                        referencedTableName: 'payment_gateway',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'CASCADE'
                    }
                ]
            }));
        } catch (e) {}
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropTable('payout_account');
        } catch (e) {}
    }
};

//# sourceMappingURL=1701977160261-payout-account-feature.js.map