"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "announcementUrlNullable1683802191064", {
    enumerable: true,
    get: function() {
        return announcementUrlNullable1683802191064;
    }
});
let announcementUrlNullable1683802191064 = class announcementUrlNullable1683802191064 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `promotion` MODIFY COLUMN `url` VARCHAR(500) NULL');
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `promotion` MODIFY COLUMN `url` VARCHAR(500) NOT NULL');
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1683802191064-announcement-url-nullable.js.map