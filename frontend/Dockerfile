FROM node:18-alpine

WORKDIR /app

ARG AUTH_API
ARG BACK_API

COPY package*.json .

RUN npm install --force
RUN npm install serve -g
COPY . .

ENV VITE_AUTH_API=${AUTH_API}
ENV VITE_BACK_API=${BACK_API}
# RUN yarn build
EXPOSE 8080
CMD ["yarn","dev"]
# CMD ["serve", "-s", "dist" , "-l", "tcp://0.0.0.0:8080"]
