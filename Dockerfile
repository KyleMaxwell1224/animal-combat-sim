# pull the official base image
FROM node:12.22.0-alpine

LABEL version="1.0"
LABEL maintainer = ["kyleman1224@gmail.com"]

# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY . ./
# start app
CMD ["npm", "start"]