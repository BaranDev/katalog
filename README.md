# Katalog

## Table of Contents
- [Katalog](#katalog)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
    - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Setting Up Development Environment](#setting-up-development-environment)
  - [Configuration](#configuration)
    - [Key Files and Settings](#key-files-and-settings)
    - [Modifying Core App Settings](#modifying-core-app-settings)
  - [Components Overview](#components-overview)
    - [Component Descriptions](#component-descriptions)
    - [Customizing Components](#customizing-components)
  - [Project Structure](#project-structure)
    - [Key Directories](#key-directories)
    - [File Organization](#file-organization)
  - [Testing](#testing)
    - [Overview](#overview-1)
    - [Running Tests](#running-tests)
  - [Deployment](#deployment)
    - [Android Deployment](#android-deployment)
      - [Generate Release Keystore](#generate-release-keystore)
      - [Configure App Details](#configure-app-details)
      - [Build Release APK](#build-release-apk)
  - [Troubleshooting](#troubleshooting)
    - [Common Development Issues](#common-development-issues)
    - [Known Issues](#known-issues)
  - [Contributing](#contributing)
    - [Areas for Improvement](#areas-for-improvement)
    - [Resources](#resources)
      - [Core Documentation](#core-documentation)
      - [Build \& Deploy](#build--deploy)

## Project Description

Katalog is a mobile application built with React Native. It aims to provide users with a seamless experience for managing and browsing, and keeping the tracks of your products in a local database.

### Overview
- **Purpose**: To offer an intuitive platform for catalog management.
- **Core Functionalities**: Image view, product display, and item management.
- **Target Audience**: Individuals and businesses needing a catalog management solution.
- **Key Customizations**: UI themes, component properties, and image handling.

## Features

- **Product Display**: Grid view of products with images.
- **Image Viewer**: Full-screen image viewing capability.
- **Item Management**: Add and manage products in the catalog.

## Getting Started

### Prerequisites
- Node.js
- React Native CLI
- Android Studio/Xcode

### Installation
1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```

### Setting Up Development Environment
1. Start the Metro bundler:
   ```sh
   npm start
   ```
2. Run the app on Android:
   ```sh
   npm run android
   ```
3. Run the app on iOS:
   ```sh
   cd ios && pod install && cd ..
   npm run ios
   ```

## Configuration

### Key Files and Settings
- **android/app/build.gradle**: Android build configuration
- **ios/katalog.xcodeproj**: iOS project configuration
- **constants/index.tsx**: Core app constants

### Modifying Core App Settings
- **Default Settings**: Modify in `constants/index.tsx`

## Components Overview

### Component Descriptions
- **ProductCard**: Product display component (`components/ProductCard.tsx`)
- **ImageViewerScreen**: Image viewing component (`components/ImageViewerScreen.tsx`)
- **HomeScreen**: Main catalog screen (`screens/HomeScreen.tsx`)
- **AddProductScreen**: Product addition screen (`screens/AddProductScreen.tsx`)

### Customizing Components
- **Properties**: Modify component props in their respective files
- **Best Practices**: Ensure consistency when updating components

## Project Structure

### Key Directories
```
📦katalog
 ┣ 📂components
 ┃ ┣ 📜ImageViewerScreen.tsx
 ┃ ┗ 📜ProductCard.tsx
 ┣ 📂constants
 ┃ ┗ 📜index.tsx
 ┣ 📂screens
 ┃ ┣ 📜AddProductScreen.tsx
 ┃ ┗ 📜HomeScreen.tsx
```

### File Organization
- Components are modular and reusable
- Screens handle main views
- Constants maintain app-wide settings

## Testing

### Overview
- **Setup**: Jest for unit testing
- **Tests Location**: `__tests__` directory

### Running Tests
```sh
npm test
```

## Deployment

### Android Deployment

#### Generate Release Keystore
1. Generate a keystore file:
   ```sh
   keytool -genkey -v -keystore your_keystore_file.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Place keystore file in `android/app` directory
3. Add keystore details in `android/gradle.properties`:
   ```properties
   MYAPP_RELEASE_STORE_FILE=your_keystore_file.keystore
   MYAPP_RELEASE_KEY_ALIAS=your_key_alias
   MYAPP_RELEASE_STORE_PASSWORD=your_store_password
   MYAPP_RELEASE_KEY_PASSWORD=your_key_password
   ```

#### Configure App Details
1. Change app name:
   - Edit `android/app/src/main/res/values/strings.xml`
   - Update `android:label` in `AndroidManifest.xml`

2. Change package name:
   - Modify `applicationId` in `android/app/build.gradle`
   - Update package in `AndroidManifest.xml`
   - Update folder structure in `android/app/src/main/java`

#### Build Release APK
1. Generate release APK:
   ```sh
   cd android
   ./gradlew assembleRelease
   ```
2. Find APK in `android/app/build/outputs/apk/release`

## Troubleshooting

### Common Development Issues
- Build failures: Check dependencies and Android/iOS configurations
- Runtime errors: Use React Native Debugger
- Metro bundler issues: Clear cache with `npx react-native start --reset-cache`
- Pod install failures: Run `cd ios && pod deintegrate && pod install`
- Red screen errors: Check component rendering and prop types
- App crashing on launch: Verify native configurations and permissions
- Hot reload not working: Restart Metro bundler and development server
- Missing assets: Ensure correct file paths and asset linking
- TypeScript missing: Sometimes npm install skips TypeScript, install manually:
   ```sh
   npm install typescript --save-dev
   ```

### Known Issues
- **App Size Growth**: The app size may increase significantly over time due to cached images and data
   - Workaround: Implement periodic cache clearing
   - Future Fix: Planned optimization in upcoming releases
- **Memory Usage**: Heavy image processing can cause slowdowns on older devices
- **Database Performance**: Large catalogs may experience loading delays
- **Image Loading**: Occasional delays in thumbnail generation
- **Background Refresh**: May not update properly in background state

## Contributing

I welcome contributions to help solve our known issues! Here's where you can help:

### Areas for Improvement
- Implement efficient cache management to address app size growth
- Optimize image processing for better performance on older devices
- Enhance database queries for faster catalog loading
- Improve thumbnail generation system
- Fix background refresh functionality

If you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with your improvements

### Resources

#### Core Documentation
- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Main framework docs
- [React Native Navigation](https://reactnavigation.org/docs/getting-started) - App navigation setup
- [React Native Image Picker](https://github.com/react-native-image-picker/react-native-image-picker) - Image selection
- [SQLite Storage](https://github.com/andpor/react-native-sqlite-storage) - Local database
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - UI icons

#### Build & Deploy
- [Android Gradle Plugin](https://developer.android.com/studio/build) - Android builds
- [CocoaPods Guide](https://guides.cocoapods.org/) - iOS dependencies
- [App Store Guidelines](https://developer.apple.com/app-store/guidelines/) - iOS deployment
- [Android App Bundle Guide](https://developer.android.com/guide/app-bundle) - Android deployment


![GitHub release (latest by date)](https://img.shields.io/github/v/release/barandev/katalog?style=for-the-badge)
![GitHub License](https://img.shields.io/github/license/barandev/katalog?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/barandev/katalog?style=for-the-badge)
