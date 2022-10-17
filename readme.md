#Song Inspector

This is the source code for Song Inspector, hosted at http://songinspector.com/. Song Inspector is an app that allows people to check the attributes of a given song based on data made available through the Spotify API. It then allows people to find new songs by 'tuning' those attributes. The result is an app that allows users to make requests like "Give me Bohemian Rhapsody, but with no vocals," or "give me Cheap Thrills, but make it acoustic."

#Architecture

Song Inspector is built on Node, served with Express, proxied with Nginx, and uses React (Vite) for the front-end. It uses PM2 to run "server.cjs" as a daemonized process that listens to API calls made by the front end.


#Deploying Song Inspector

If you are interested in deploying Song Inspector yourself, you can use "npm run build" to compile a distribution package. You can then serve this however you like, but you will need a server running "server.cjs" as a process, and you will need to modify the endpoints of the Song Object component to match the server where you are running "server.cjs"