"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usernamePasswordNullable1681500830320", {
    enumerable: true,
    get: function() {
        return usernamePasswordNullable1681500830320;
    }
});
let usernamePasswordNullable1681500830320 = class usernamePasswordNullable1681500830320 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `fleet` MODIFY COLUMN `userName` VARCHAR(500) NULL');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `fleet` MODIFY COLUMN `password` VARCHAR(500) NULL');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `fleet` MODIFY COLUMN `userName` VARCHAR(500) NOT NULL');
        } catch (error) {
            console.error(error);
        }
        try {
            await queryRunner.query('ALTER TABLE `fleet` MODIFY COLUMN `password` VARCHAR(500) NOT NULL');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1681500830320-username-password-nullable.js.map