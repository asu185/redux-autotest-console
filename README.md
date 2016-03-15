# Autotest Web Tool

This is a web tool which helps you run Calabash testings on multiple devices simultaneously without knowing the Calabash commands.

##How to build it
Currently, the web tool need to be built on the same machine as the one which runs testings.
So before using the web tool, make sure you've installed calabash-android
https://github.com/calabash/calabash-android

```
$sudo gem install calabash-android
```

Also, it uses Mongodb to save the devices' status. So make sure you have Mongodb installed and is running on your machine. 
https://docs.mongodb.org/manual/installation/

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

Finally, build the web tool in either way, locally for development or as a remote server for deployment. The default port is at 8888:
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

### Sending emails after the testings completed
To activate this funcationality, you have to modify the code. 
Set the email & password in ``sendMailTo`` function in ``server/controllers/device-api.js`` to indicate where the emails are sent from.

**Note**: You might have to enable “allow less secure apps to access to account” on the account which sends the email, by the following link
https://www.google.com/settings/security/lesssecureapps

##How to use it
Check the document
https://docs.google.com/document/d/1iRAF0Z1ohfDo9jZDOiwpeD6CuGkyqYAKhwYJa_aRt9E/edit