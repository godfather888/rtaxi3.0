sealed class IntentResult {
  const IntentResult._();

  const factory IntentResult.success() = _Success;
  const factory IntentResult.failure({required String errorMessage}) = _Failure;
  const factory IntentResult.redirect({required String url}) = _Redirect;

  Map<String, dynamic> toJson() => switch (this) {
    _Success() => {'type': 'success'},
    _Failure(:final errorMessage) => {'type': 'failure', 'errorMessage': errorMessage},
    _Redirect(:final url) => {'type': 'redirect', 'url': url},
  };

  static IntentResult fromJson(Map<String, dynamic> json) {
    return switch (json['type']) {
      'success' => const IntentResult.success(),
      'failure' => IntentResult.failure(errorMessage: json['errorMessage'] as String),
      'redirect' => IntentResult.redirect(url: json['url'] as String),
      _ => throw ArgumentError('Unknown IntentResult type: ${json['type']}'),
    };
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final IntentResult otherResult = other as IntentResult;
    return toJson() == otherResult.toJson();
  }

  @override
  int get hashCode {
    return switch (this) {
      _Success() => 0,
      _Failure(:final errorMessage) => errorMessage.hashCode,
      _Redirect(:final url) => url.hashCode,
    };
  }
}

class _Success extends IntentResult {
  const _Success() : super._();
}

class _Failure extends IntentResult {
  final String errorMessage;

  const _Failure({required this.errorMessage}) : super._();
}

class _Redirect extends IntentResult {
  final String url;

  const _Redirect({required this.url}) : super._();
}
