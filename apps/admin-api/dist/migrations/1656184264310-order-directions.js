"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "orderDirections1656184264310", {
    enumerable: true,
    get: function() {
        return orderDirections1656184264310;
    }
});
let orderDirections1656184264310 = class orderDirections1656184264310 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE request ADD COLUMN directions MULTIPOINT;');
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1656184264310-order-directions.js.map