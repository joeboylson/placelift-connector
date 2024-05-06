# NOTE:
# This Dockerfile is very simple:
#   1. set up a node environment (v22)
#   2. run the setup and install commands from the parent package.json
#   3. run the start command . . . again, from the parent package.json  

FROM node:22-alpine

COPY . .
RUN npm run setup
RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]