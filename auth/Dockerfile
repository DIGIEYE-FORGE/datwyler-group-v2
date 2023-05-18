FROM node:latest


WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn  
COPY ./ ./ 

RUN yarn generate
# RUN yarn build 
COPY *.proto ./dest
ARG HTTP_PORT=5000
ARG GRPC_PORT=5001

# expose the ports
EXPOSE ${HTTP_PORT} ${GRPC_PORT}
RUN chown -R node:node /usr/src/app
USER node
# && 
CMD yarn deploy:migration  && yarn deploy:seed && yarn dev

