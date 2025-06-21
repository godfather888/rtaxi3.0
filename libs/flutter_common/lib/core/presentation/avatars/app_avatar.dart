import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class AppAvatar extends StatelessWidget {
  // First string is local path, second is url
  final String? url;
  final String? assetPath;
  final String defaultAvatarPath;
  final double size;

  const AppAvatar({super.key, this.url, this.assetPath, required this.defaultAvatarPath, this.size = 46});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.white,
        border: Border.all(color: const Color(0xFFF8FAFC), width: 8),
      ),
      padding: const EdgeInsets.all(8),
      child:
          url == null
              ? Image.asset(
                defaultAvatarPath,
                fit: BoxFit.cover,
                filterQuality: FilterQuality.high,
                isAntiAlias: true,
                width: size,
                height: size,
                package: 'flutter_common',
              )
              : ClipRRect(
                borderRadius: BorderRadius.circular(size / 2),
                child: CachedNetworkImage(
                  imageUrl: url!,
                  fit: BoxFit.cover,
                  filterQuality: FilterQuality.high,
                  width: size,
                  height: size,
                ),
              ),
    );
  }
}
