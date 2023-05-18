FROM node:latest


WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn  
COPY ./ ./ 
RUN yarn generate
# RUN npx prisma migrate dev --name "licences"
RUN yarn build 
COPY *.proto ./dest
# set an environment variable for the port numbers
ARG HTTP_PORT=3000
ARG GRPC_PORT=3001

# expose the ports
EXPOSE ${HTTP_PORT} ${GRPC_PORT}
RUN chown -R node:node /usr/src/app
USER node
# 
CMD yarn deploy:migration && yarn start:prod 