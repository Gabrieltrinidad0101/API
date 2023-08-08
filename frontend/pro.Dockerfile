FROM node:18-alpine as build

ARG API

WORKDIR /usr/app/frontend

COPY package.json . 

RUN npm install .

COPY . .

COPY share /usr/app/share

RUN VITE_BASE_URL=$API npm run build

FROM nginx:1.23.3-alpine

COPY --from=build /usr/app/frontend/dist /usr/nginx/share/html

COPY ./nginx.conf /etc/nginx/conf.d

CMD ["nginx","-g","daemon off;"]
