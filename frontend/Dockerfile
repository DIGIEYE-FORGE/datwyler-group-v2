FROM node:18-alpine

WORKDIR /app

ARG AUTH_API
ARG BACK_API

COPY package*.json .

RUN npm install --force
RUN npm install serve -g
COPY . .

RUN npm run build
# RUN yarn build
EXPOSE 8085 8084
# CMD ["yarn","preview"]
CMD ["serve", "-s", "dist" , "-l", "tcp://0.0.0.0:8084"]
