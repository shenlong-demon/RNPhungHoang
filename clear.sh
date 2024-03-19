cd android && ./gradlew clean && cd ..
npm cache verify && npm cache clean --force && rm -rf **/build/* && rm -rf **/.idea/*
rm -rf ./android/build
rm -rf ./android/app/build
yarn cache clean