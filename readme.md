King Azit Native App

## King Azir Deep Link Info
<hr/>

## [Scheme]
- **kingazit://**
## [admin screen]
- **kingazit://admin/:memberId/:type/:count/:token**
## [text script]
#### [IOS]
``` 
npx uri-scheme open "kingazit://admin/7a034705-7207-4791-9d0a-1e8371008b4b/user/black/4/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjgwNDE3MzAwLCJpYXQiOjE2ODA0MTcxMjB9.JTqokx1YicPiexsswDx1En-XmHPv4DC4z2bJpa3BZxs" --ios

npx uri-scheme open "kingazit://admin/user/Gold/1/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjc5MzE4MDE4LCJpYXQiOjE2NzkzMTc4Mzh9.QkUcbaPYYrZwxK1pEvCn3gxpkQ44n1LF_eNRBIVKXK8" --ios
```
#### [Android]
``` 
npx uri-scheme open "kingazit://admin/user/Black/10/token" --android
```

## [IOS 실제 기기 연결]
```
npm install -g ios-deploy
xcrun xctrace list devices
react-native run-ios --device "워녁이 iphone 13 Pro" --configuration Release
react-native run-ios --udid 0412e2c230a14e23451699
```
