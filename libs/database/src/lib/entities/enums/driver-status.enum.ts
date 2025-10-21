import { registerEnumType } from "@nestjs/graphql";

export enum DriverStatus {
    Online = 'online',
    Offline = 'offline',
    Blocked = 'blocked',
    InService = 'in service',
    WaitingDocuments = 'waiting documents',
    PendingApproval = 'pending approval',
    SoftReject = 'soft reject',
    HardReject = 'hard reject',
    Parked = 'parked',
}

registerEnumType(DriverStatus, { name: 'DriverStatus'});