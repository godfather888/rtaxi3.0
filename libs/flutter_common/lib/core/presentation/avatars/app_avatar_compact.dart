import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_common/core/color_palette/color_palette.dart';

class AppAvatarCompact extends StatelessWidget {
  final String? url;
  final String? assetPath;
  final String defaultAvatarPath;

  const AppAvatarCompact({super.key, this.url, this.assetPath, required this.defaultAvatarPath});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      padding: const EdgeInsets.all(6),
      clipBehavior: Clip.hardEdge,
      decoration: const BoxDecoration(shape: BoxShape.circle, color: ColorPalette.neutral95),
      child: ClipOval(
        child:
            url == null
                ? Image.asset(
                  defaultAvatarPath,
                  fit: BoxFit.contain,
                  filterQuality: FilterQuality.high,
                  isAntiAlias: true,
                  package: 'flutter_common',
                )
                : CachedNetworkImage(
                  imageUrl: url!,
                  fit: BoxFit.cover,
                  filterQuality: FilterQuality.high,
                  width: 48,
                  height: 48,
                ),
      ),
    );
  }
}
