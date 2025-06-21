import 'package:better_localization/l10n/messages.dart';
import 'package:better_localization/localizations.dart' as common_messages;
import 'package:driver_flutter/config/env.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:path_provider/path_provider.dart';
import 'package:driver_flutter/config/locator/locator.dart';
import 'package:flutter_common/core/theme/theme.dart';
import 'package:driver_flutter/config/theme/fonts.dart';
import 'package:driver_flutter/core/blocs/settings.dart';
import 'package:wakelock_plus/wakelock_plus.dart';
import 'core/router/app_router.dart';
import 'core/router/router_observer.dart';

import 'firebase_options.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

void main() async {
  SentryWidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: '.env.${kReleaseMode ? 'prod' : 'dev'}', isOptional: true);
  HydratedBloc.storage = await HydratedStorage.build(
    storageDirectory:
        kIsWeb ? HydratedStorageDirectory.web : HydratedStorageDirectory((await getTemporaryDirectory()).path),
  );
  // await HydratedBloc.storage.clear();
  WakelockPlus.enable();
  configureDependencies();
  await Hive.initFlutter();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  if (dotenv.maybeGet('SENTRY_DSN') != null) {
    await SentryFlutter.init(
      (options) {
        options.dsn = dotenv.maybeGet('SENTRY_DSN');
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
        // We recommend adjusting this value in production.
        options.tracesSampleRate = 1.0;
        // The sampling rate for profiling is relative to tracesSampleRate
        // Setting to 1.0 will profile 100% of sampled transactions:
        options.profilesSampleRate = 1.0;
      },
      appRunner: () => runApp(SentryWidget(child: const MyApp())),
    );
  } else {
    runApp(const MyApp());
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final shortestSide = MediaQuery.of(context).size.shortestSide;
    if (shortestSide < 600) {
      SystemChrome.setPreferredOrientations([
        DeviceOrientation.portraitUp,
        DeviceOrientation.portraitDown,
      ]);
    }
    return BlocProvider.value(
      value: locator<SettingsCubit>(),
      child: BlocBuilder<SettingsCubit, SettingsState>(
        builder: (context, state) {
          return MaterialApp.router(
            debugShowCheckedModeBanner: false,
            title: Env.appName,
            themeMode: ThemeMode.light,
            theme: AppTheme.light(
              Fonts.primary,
              Fonts.secondary,
            ),
            darkTheme: AppTheme.dark(
              Fonts.primary,
              Fonts.secondary,
            ),
            locale: Locale(state.locale),
            localizationsDelegates: const [
              ...S.localizationsDelegates,
              common_messages.S.delegate,
            ],
            supportedLocales: S.supportedLocales,
            routerConfig: locator<AppRouter>().config(
              navigatorObservers: () => [
                RouterObserver(),
              ],
            ),
          );
        },
      ),
    );
  }
}
