Redis is often referred as a data structures server that is, Redis provides access to mutable data structures via a set of commands, which are sent using a server-client model with TCP sockets and a simple protocol. As a result, different processes can query and modify the same data structures in a shared way.

Run ```brew install redis```

To launch redis at login, run ```ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents```

To load redis, run ```launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist``` 

Edit your ```/usr/local/etc/redis.conf``` file, uncommenting the file with ```requirepass``` and setting the password to ```evanlounge```, e.g., ```requirepass evanlounge```. 

Additionally, set the port line to be ```port 6380```.

Run Redis with ```redis-server /usr/local/etc/redis.conf```. You will need to do this each time you are working on the project.
