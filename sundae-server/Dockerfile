FROM node:15.13-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]



# npx create-react-app my-app
# docker build --tag react .
# docker run react
# docker run --publish 3000:3000 react
# docker-compose run app