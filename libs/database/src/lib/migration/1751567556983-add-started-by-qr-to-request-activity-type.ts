import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export enum RequestActivityType {
  RequestedByOperator = "RequestedByOperator",
  BookedByOperator = "BookedByOperator",
  RequestedByRider = "RequestedByRider",
  BookedByRider = "BookedByRider",
  DriverAccepted = "DriverAccepted",
  ArrivedToPickupPoint = "ArrivedToPickupPoint",
  CanceledByDriver = "CanceledByDriver",
  CanceledByRider = "CanceledByRider",
  CanceledByOperator = "CanceledByOperator",
  Started = "Started",
  ArrivedToDestination = "ArrivedToDestination",
  Paid = "Paid",
  Reviewed = "Reviewed",
  Expired = "Expired",
  StartedByQr = "StartedByQr", // новое значение
}

export class AddStartedByQrToRequestActivityType1751567556983
  implements MigrationInterface
{
  name = "AddStartedByQrToRequestActivityType1751567556983";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "request_activity",
      "type",
      new TableColumn({
        name: "type",
        type: "enum",
        enum: Object.values(RequestActivityType),
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
