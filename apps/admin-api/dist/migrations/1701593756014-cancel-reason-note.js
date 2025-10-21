"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CancelReasonNote1701593756014", {
    enumerable: true,
    get: function() {
        return CancelReasonNote1701593756014;
    }
});
let CancelReasonNote1701593756014 = class CancelReasonNote1701593756014 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` ADD COLUMN `cancelReasonNote` TEXT NULL;');
        } catch (e) {
            console.log(e);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE `request` DROP COLUMN `cancelReasonNote`;');
        } catch (e) {
            console.log(e);
        }
    }
};

//# sourceMappingURL=1701593756014-cancel-reason-note.js.map