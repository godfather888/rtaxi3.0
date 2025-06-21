class ChatMessageEntity {
  final String id;
  final String message;
  final bool isSender;
  final DateTime createdAt;

  const ChatMessageEntity({required this.id, required this.message, required this.isSender, required this.createdAt});

  factory ChatMessageEntity.fromJson(Map<String, dynamic> json) => ChatMessageEntity(
    id: json['id'] as String,
    message: json['message'] as String,
    isSender: json['isSender'] as bool,
    createdAt: DateTime.parse(json['createdAt'] as String),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'message': message,
    'isSender': isSender,
    'createdAt': createdAt.toIso8601String(),
  };

  @override
  String toString() {
    return 'ChatMessageEntity(id: $id, message: $message, isSender: $isSender, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final ChatMessageEntity otherEntity = other as ChatMessageEntity;
    return id == otherEntity.id &&
        message == otherEntity.message &&
        isSender == otherEntity.isSender &&
        createdAt == otherEntity.createdAt;
  }
}
