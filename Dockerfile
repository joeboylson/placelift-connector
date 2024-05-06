FROM node:20.11.1-alpine

COPY . .
RUN npm run setup
RUN npm run build

EXPOSE 80

CMD ["npm run start"]