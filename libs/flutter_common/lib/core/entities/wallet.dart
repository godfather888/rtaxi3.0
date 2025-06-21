class WalletEntity {
  double balance;
  String currency;
  WalletEntity({required this.balance, required this.currency});
  factory WalletEntity.fromJson(Map<String, dynamic> json) =>
      WalletEntity(balance: (json['balance'] as num).toDouble(), currency: json['currency'] as String);

  Map<String, dynamic> toJson() => {'balance': balance, 'currency': currency};

  @override
  String toString() {
    return 'WalletEntity(balance: $balance, currency: $currency)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final WalletEntity otherEntity = other as WalletEntity;
    return balance == otherEntity.balance && currency == otherEntity.currency;
  }
}
