import java.util.Properties

plugins {
    id("com.android.application")
    // START: FlutterFire Configuration
    id("com.google.gms.google-services")
    id("com.google.firebase.crashlytics")
    // END: FlutterFire Configuration
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}

val keystorePropertiesFile = rootProject.file("key.properties")
val keystoreProperties = Properties()
if (keystorePropertiesFile.exists()) {
  keystoreProperties.load(keystorePropertiesFile.inputStream())
}

android {
    namespace = "com.ridy.taxi.driver_flutter"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = "28.1.13356709"

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_11.toString()
    }

    defaultConfig {
        applicationId = "com.ridy.driver"
        minSdk = 21
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    signingConfigs {
        create("release") {
            val keyAlias = keystoreProperties["keyAlias"] as? String
            val keyPassword = keystoreProperties["keyPassword"] as? String
            val storeFile = keystoreProperties["storeFile"] as? String
            val storePassword = keystoreProperties["storePassword"] as? String

            if (keyAlias == null || keyPassword == null || storeFile == null || storePassword == null) {
                throw GradleException("One or more keystore properties are missing or null. Please check your keystore.properties file.")
            }

            this.keyAlias = keyAlias
            this.keyPassword = keyPassword
            this.storeFile = file(storeFile)
            this.storePassword = storePassword
        }
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("release")
            isMinifyEnabled = false
            isShrinkResources = false
        }
    }
}

flutter {
    source = "../.."
}
