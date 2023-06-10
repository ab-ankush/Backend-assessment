To set up you just have to clone the git repository and npm install all the node_modules needed to start the app
but the mein thing to be noted that we need a mongodb atlas link so you have to add a dotenv file and add your own
mongodb url to connect it to online database.
after doing all the steps mentioned above you just have to run "node index.js" to run the command

One main assumptions i've done is to create a demo middle ware that just sets a user to 'ab-ankush'
because its not a connected to the frontend but in other cases we can use any authentication framework like
jsonWebToken to set req.user to a real user through frontend