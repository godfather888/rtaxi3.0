import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationToDriver1753041600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `driver` ADD COLUMN `location` POINT NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `driver` DROP COLUMN `location`"
    );
  }
}