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
    PayoutMethodEntityMigration1627567460081: function() {
        return PayoutMethodEntityMigration1627567460081;
    },
    PayoutMethodType: function() {
        return PayoutMethodType;
    },
    SavedPaymentMethodType: function() {
        return SavedPaymentMethodType;
    }
});
const _typeorm = require("typeorm");
const _Table = require("typeorm/schema-builder/table/Table");
var PayoutMethodType;
(function(PayoutMethodType) {
    PayoutMethodType["Stripe"] = "stripe";
    PayoutMethodType["BankTransfer"] = "bank_transfer";
})(PayoutMethodType || (PayoutMethodType = {}));
var SavedPaymentMethodType;
(function(SavedPaymentMethodType) {
    SavedPaymentMethodType["CARD"] = "CARD";
    SavedPaymentMethodType["BANK_ACCOUNT"] = "BANK_ACCOUNT";
})(SavedPaymentMethodType || (SavedPaymentMethodType = {}));
let PayoutMethodEntityMigration1627567460081 = class PayoutMethodEntityMigration1627567460081 {
    async up(queryRunner) {
        try {
            await queryRunner.query('DELETE FROM `payout_account` WHERE id > 0');
            await queryRunner.createTable(new _Table.Table({
                name: 'payout_method',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'enabled',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: Object.values(PayoutMethodType)
                    },
                    {
                        name: 'publicKey',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'privateKey',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'saltKey',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'merchantId',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'mediaId',
                        type: 'int',
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_payout_method_media',
                        columnNames: [
                            'mediaId'
                        ],
                        referencedTableName: 'media',
                        referencedColumnNames: [
                            'id'
                        ],
                        onDelete: 'SET NULL',
                        onUpdate: 'NO ACTION'
                    }
                ]
            }), true);
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.addColumn('payout_account', new _typeorm.TableColumn({
                name: 'payoutMethodId',
                type: 'int',
                isNullable: true
            }));
            await queryRunner.createForeignKey('payout_account', new _typeorm.TableForeignKey({
                name: 'fk_payout_account_payout_method',
                columnNames: [
                    'payoutMethodId'
                ],
                referencedTableName: 'payout_method',
                referencedColumnNames: [
                    'id'
                ],
                onDelete: 'SET NULL',
                onUpdate: 'NO ACTION'
            }));
            await queryRunner.addColumn('payout_account', new _typeorm.TableColumn({
                name: 'type',
                type: 'enum',
                enum: Object.values(SavedPaymentMethodType)
            }));
            await queryRunner.addColumn('payout_account', new _typeorm.TableColumn({
                name: 'last4',
                type: 'varchar'
            }));
            await queryRunner.addColumn('payout_account', new _typeorm.TableColumn({
                name: 'currency',
                type: 'varchar'
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropTable('payout_method');
            await queryRunner.dropForeignKey('payout_account', 'fk_payout_account_payout_method');
            await queryRunner.dropColumn('payout_account', 'payoutMethodId');
            await queryRunner.dropColumn('payout_account', 'type');
            await queryRunner.dropColumn('payout_account', 'last4');
            await queryRunner.dropColumn('payout_account', 'currency');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1703154058360-payout-method.js.map