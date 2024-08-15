
# del-android-bundle
rm -f ./android/app/src/main/assets/index.android.bundle

# attach-android-bundle
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

# del-apk-file
rm -f ./android/app/build/outputs/apk/debug/*.apk && rm -rf ./android/app/build/outputs/apk/release/*.apk

# rm-dup-files
find android/app/src/main/res/drawable-xxxhdpi android/app/src/main/res/drawable-xxhdpi android/app/src/main/res/drawable-xhdpi android/app/src/main/res/drawable-mdpi android/app/src/main/res/drawable-hdpi android/app/src/main/res/raw -type f ! -name launch_screen* -delete

cd ./android && ENVFILE=.env.prod ./gradlew assembleRelease && cd ..
