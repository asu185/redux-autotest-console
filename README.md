# Redux / Express boilerplate
```
Make sure you've installed
$sudo gem install calabash-android

For Development
$sudo npm install -g webpack nodemon bower
$npm install
$bower install
$npm start

For Deployment
First, change the URL in 
 - server/server.js
 - public/src/actions/index.js
 - public/src/containers/apk-selector.js
 - public/screenshot.ejs
 - public/index.html
Then
$sudo npm install -g forever bower
$npm install
$bower install
$npm run deploy
```
