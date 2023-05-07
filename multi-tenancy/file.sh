cat <<'END_HELP' > Dockerfile.k8s 
FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm install serve -g
COPY . .
ENV VITE_API_URL=${{ env.API_URL }}
ENV VITE_BACK_API=${{ env.BACK_API }}
ENV VITE_AUTH_AUTH=${{ env.AUTH_API }}
RUN yarn build
EXPOSE 80
CMD ["serve", "-s", "dist" , "-l", "tcp://0.0.0.0:80"]
END_HELP