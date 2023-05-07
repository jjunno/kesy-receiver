FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY kesy.crt /etc/nginx/kesy.crt
COPY kesy.key /etc/nginx/kesy.key
EXPOSE 80 443