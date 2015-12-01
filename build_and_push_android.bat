echo Building
call cordova build android

echo Installing
call adb install -r .\platforms\android\build\outputs\apk\android-debug.apk

echo Launching
call adb shell am start -n com.mafiareturns.notifier/com.mafiareturns.notifier.MainActivity
