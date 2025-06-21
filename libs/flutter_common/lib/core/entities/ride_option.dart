import 'package:flutter_common/core/enums/ride_option_icon.dart';

class RideOptionEntity {
  final String id;
  final String name;
  final RideOptionIcon icon;
  final String? description;
  final double? price;

  RideOptionEntity({required this.id, required this.name, required this.icon, this.description, this.price});

  factory RideOptionEntity.fromJson(Map<String, dynamic> json) => RideOptionEntity(
    id: json['id'] as String,
    name: json['name'] as String,
    icon: RideOptionIcon.values.firstWhere(
      (e) => e.name == json['icon'] as String,
      orElse: () => RideOptionIcon.custom1,
    ),
    description: json['description'] as String?,
    price: (json['price'] as num?)?.toDouble(),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'icon': icon.name,
    'description': description,
    'price': price,
  };

  @override
  String toString() {
    return 'RideOptionEntity(id: $id, name: $name, icon: $icon, description: $description, price: $price)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    if (other.runtimeType != runtimeType) return false;
    final RideOptionEntity otherEntity = other as RideOptionEntity;
    return id == otherEntity.id &&
        name == otherEntity.name &&
        icon == otherEntity.icon &&
        description == otherEntity.description &&
        price == otherEntity.price;
  }
}
