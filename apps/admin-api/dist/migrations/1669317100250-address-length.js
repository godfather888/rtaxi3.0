"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addressLength1669317100250", {
    enumerable: true,
    get: function() {
        return addressLength1669317100250;
    }
});
let addressLength1669317100250 = class addressLength1669317100250 {
    async up(queryRunner) {
        try {
            await queryRunner.query('ALTER TABLE request MODIFY addresses TEXT NOT NULL;');
        } catch (error) {}
    }
    async down(queryRunner) {}
};

//# sourceMappingURL=1669317100250-address-length.js.map