module.exports = {
  expo: {
    name: "rdx-client",
    slug: "rdx-client",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./src/assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/android-icon-foreground.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/images/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      "typedRoutes": true
    },
    extra: {
      eas: {
        projectId: process.env.EXPO_PROJECT_ID
      },
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      googleMapsKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY,
      stripeKey: process.env.EXPO_PUBLIC_STRIPE_KEY
    }
  }
};
