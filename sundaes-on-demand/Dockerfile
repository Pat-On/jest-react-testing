FROM node:15.13-alpine

WORKDIR /usr/src/app
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
# installing all dependencie ? something is wrong?
RUN npm run build

CMD ["npm", "start"]



# npx create-react-app my-app
# docker build --tag react .
# docker run react
# docker run --publish 3000:3000 react
# docker-compose run app