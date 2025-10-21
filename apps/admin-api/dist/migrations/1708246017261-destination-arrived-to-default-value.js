"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DestinationArrivedToDefaultValue1708246017261", {
    enumerable: true,
    get: function() {
        return DestinationArrivedToDefaultValue1708246017261;
    }
});
const _typeorm = require("typeorm");
let DestinationArrivedToDefaultValue1708246017261 = class DestinationArrivedToDefaultValue1708246017261 {
    async up(queryRunner) {
        try {
            await queryRunner.changeColumn('request', 'destinationArrivedTo', new _typeorm.TableColumn({
                name: 'destinationArrivedTo',
                type: 'tinyint',
                default: -1
            }));
        } catch (error) {
            console.error(error);
        }
    }
    async down(queryRunner) {
        try {
            await queryRunner.changeColumn('request', 'destinationArrivedTo', new _typeorm.TableColumn({
                name: 'destinationArrivedTo',
                type: 'tinyint',
                default: 0
            }));
        } catch (error) {
            console.error(error);
        }
    }
};

//# sourceMappingURL=1708246017261-destination-arrived-to-default-value.js.map