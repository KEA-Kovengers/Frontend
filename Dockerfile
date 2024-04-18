# st 1 - 의존성 설치 및 애플리케이션 빌드
FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN ls -la /usr/src/app
RUN npm run build 

# st 2 - Nginx 서버로 서빙
FROM nginx
EXPOSE 80
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
