YELLOW='\033[1;33m'
LIGHT_PURPLE='\033[0;35m'
NC='\033[0m'

# close all existing mongod connections
killall mongod

# if node_modules doesn't exist, run npm i; else, proceed
if [ ! -d node_modules ]; then
  printf "\n\n${YELLOW}Installing node_modules...\n\n"
  npm i
else
  printf "\n\n${LIGHT_PURPLE}Looks like you've already run npm i -- nice!\n
  Continuing to start up server...\n\n${NC}"
fi
