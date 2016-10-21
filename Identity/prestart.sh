YELLOW='\033[1;33m'
LIGHT_PURPLE='\033[0;35m'
LIGHT_BLUE='\033[1;34m'
NC='\033[0m'
SERVER_PATH=server

# if node_modules doesn't exist, run npm i; else, proceed
if [ ! -d node_modules ]; then
  printf "\n\n${YELLOW}Installing node_modules for the client side in / root dir...\n\n"
  npm i
else
  printf "\n\n${LIGHT_PURPLE}Looks like you've already run npm i on the client side in / root dir -- nice!\n
  Continuing to start up server...\n\n${NC}"
fi

# if node_modules doesn't exist, run npm i; else, proceed
if [ ! -d server/node_modules ]; then
  printf "\n\n${YELLOW}Installing node_modules for the backend in /server dir...\n\n"
  cd server
  npm i
  cd -
else
  printf "\n\n${LIGHT_PURPLE}Looks like you've already run npm i on the backend (server dir) -- nice!\n
  Continuing to start up server for db in a new tab...\n\n${NC}"
fi

# close all existing mongod connections if they exist
if [ [$(ps -ef | grep mongod | grep -v grep | wc -l | tr -d ' ') -gt 0] ]; then
  printf "\n\n${YELLOW}Killing all existing mongod connections...\n\n"
  killall mongod
else
  printf "\n\n${LIGHT_BLUE}Starting up mongod in a new tab...\n\n"
fi
