FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn  
COPY ./ ./ 
RUN yarn generate
RUN yarn build 
COPY *.proto ./build
# set an environment variable for the port numbers
ARG HTTP_PORT=3000
ARG GRPC_PORT=3001

# expose the ports
EXPOSE ${HTTP_PORT} ${GRPC_PORT}

CMD yarn start:prod