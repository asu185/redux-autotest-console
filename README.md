# Autotest Web Tool

This is a web tool which helps you run Calabash testings on multiple devices simultaneously without knowing the Calabash commands.
When click on the 'Run Testings' button, only unlock devices with non-empty feature would be ran.

Currently, the web tool need to be built on the same machine as the one which runs testings.
So before using the web tool, make sure you've installed

```
$sudo gem install calabash-android
```

Then place the omlet-autotest project on the root of the directory, so it looks like this
```
./config
./node_modules
./omlet-autotest
./public
./server
webpack.config.js
bower.json
nodemon.json
package.json
```

Finally, build the web tool in either way. The default port is 8888:
###1. Build the web tool locally for development

```
$sudo npm install -g webpack nodemon bower
$npm install
$bower install
$npm start
```

###2. Build the web tool as a remote server for deployment
First, replace the URL (http://localhost:8888) in the following files with your own IP
```
 - server/server.js
 - public/src/actions/index.js
 - public/src/containers/apk-selector.js
 - public/screenshot.ejs
```
Since we don't need hot reloading server, replace ``http://localhost:8080/bundle.js`` with ``bundle.js`` in ``public/index.html``, then runs

```
$sudo npm install -g forever bower
$npm install
$bower install
$npm run deploy
```

### Activate Sending Email Functionality
To use the sending email functionality, you have to set the email & password in ``sendMailTo`` function in ``server/controllers/device-api.js``