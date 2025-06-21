DateTime fromGraphQLTimestampToDartDateTime(dynamic data) =>
    data is int
        ? DateTime.fromMillisecondsSinceEpoch(data)
        : data is String
        ? DateTime.parse(data)
        : throw ArgumentError('Invalid timestamp format: $data');

int fromDartDateTimeToGraphQLTimestamp(DateTime data) => data.millisecondsSinceEpoch;

int? fromDartDateTimeNullableToGraphQLTimestampNullable(DateTime? datetime) => datetime?.millisecondsSinceEpoch;

DateTime? fromGraphQLTimestampNullableToDartDateTimeNullable(int? milSinceEpoch) =>
    milSinceEpoch != null
        // ignore: unnecessary_type_check
        ? (milSinceEpoch is int
            ? DateTime.fromMillisecondsSinceEpoch(milSinceEpoch)
            : DateTime.parse(milSinceEpoch.toString()))
        : null;
