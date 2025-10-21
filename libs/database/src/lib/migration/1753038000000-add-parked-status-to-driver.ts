import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParkedStatusToDriver1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `driver` MODIFY COLUMN `status` ENUM('online','offline','blocked','in service','waiting documents','pending approval','soft reject','hard reject','parked') NOT NULL DEFAULT 'offline';"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `driver` MODIFY COLUMN `status` ENUM('online','offline','blocked','in service','waiting documents','pending approval','soft reject','hard reject') NOT NULL DEFAULT 'offline';"
    );
  }
}