"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GiftCardSchemaUpdate1705735103420", {
    enumerable: true,
    get: function() {
        return GiftCardSchemaUpdate1705735103420;
    }
});
const _typeorm = require("typeorm");
let GiftCardSchemaUpdate1705735103420 = class GiftCardSchemaUpdate1705735103420 {
    async up(queryRunner) {
        try {
            await queryRunner.renameTable('gift_card', 'gift_code');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.addColumns('gift', [
                new _typeorm.TableColumn({
                    name: 'name',
                    type: 'varchar'
                }),
                new _typeorm.TableColumn({
                    name: 'createdByOperatorId',
                    type: 'int'
                }),
                new _typeorm.TableColumn({
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'NOW()'
                })
            ]);
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.createForeignKey('gift', new _typeorm.TableForeignKey({
                columnNames: [
                    'createdByOperatorId'
                ],
                referencedColumnNames: [
                    'id'
                ],
                referencedTableName: 'operator',
                onDelete: 'SET NULL'
            }));
            await queryRunner.createIndex('gift', new _typeorm.TableIndex({
                columnNames: [
                    'createdByOperatorId'
                ]
            }));
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.dropColumns('gift_code', [
                'amount',
                'currency',
                'availableTimestamp',
                'expirationTimestamp',
                'isUsed'
            ]);
            await queryRunner.addColumns('gift_code', [
                new _typeorm.TableColumn({
                    name: 'usedAt',
                    type: 'datetime',
                    isNullable: true
                }),
                new _typeorm.TableColumn({
                    name: 'giftId',
                    type: 'int'
                })
            ]);
            await queryRunner.createForeignKey('gift_code', new _typeorm.TableForeignKey({
                columnNames: [
                    'giftId'
                ],
                referencedColumnNames: [
                    'id'
                ],
                referencedTableName: 'gift',
                onDelete: 'CASCADE'
            }));
            await queryRunner.createIndex('gift_code', new _typeorm.TableIndex({
                columnNames: [
                    'giftId'
                ]
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1705735103420-gift-card-schema-update.js.map