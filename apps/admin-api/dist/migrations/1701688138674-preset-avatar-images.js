"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PresetAvatarImages1701688138674", {
    enumerable: true,
    get: function() {
        return PresetAvatarImages1701688138674;
    }
});
const _typeorm = require("typeorm");
let PresetAvatarImages1701688138674 = class PresetAvatarImages1701688138674 {
    async up(queryRunner) {
        try {
            await queryRunner.addColumn('rider', new _typeorm.TableColumn({
                name: 'presetAvatarNumber',
                type: 'int',
                isNullable: true
            }));
            await queryRunner.addColumn('driver', new _typeorm.TableColumn({
                name: 'presetAvatarNumber',
                type: 'int',
                isNullable: true
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.dropColumn('rider', 'presetAvatarNumber');
            await queryRunner.dropColumn('driver', 'presetAvatarNumber');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1701688138674-preset-avatar-images.js.map