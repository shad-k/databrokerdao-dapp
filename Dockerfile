FROM node:8 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN
ARG REACT_APP_DAPI_URL
ENV REACT_APP_DAPI_URL=$REACT_APP_DAPI_URL
COPY .npmrc .npmrc
RUN npm i
COPY . ./
RUN npm run build

FROM nginx:1.13.8-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]