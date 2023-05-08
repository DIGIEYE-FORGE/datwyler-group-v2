FROM node:latest


WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn  
COPY ./ ./ 

RUN yarn generate
RUN yarn build 
COPY *.proto ./dest
ARG HTTP_PORT=3000
ARG GRPC_PORT=5000

# expose the ports
EXPOSE ${HTTP_PORT} ${GRPC_PORT}
RUN chown -R node:node /usr/src/app
USER node
# && yarn deploy:seed
CMD yarn deploy:migration  && yarn start:prod

