"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "preauthV21672644387795", {
    enumerable: true,
    get: function() {
        return preauthV21672644387795;
    }
});
let preauthV21672644387795 = class preauthV21672644387795 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE payment ADD COLUMN orderNumber varchar(255);');
        } catch (error) {
            try {
                await queryRunner.query('CREATE INDEX `INDEX_ORDER_NUMBER` ON `payment` (`orderNumber`);');
            } catch (error) {
                console.error(error);
            }
        }
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1672644387795-preauth-v2.js.map