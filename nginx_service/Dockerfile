FROM nginx
RUN rm /etc/nginx/conf.d/default.conf

COPY ./block_configs/* /etc/nginx/conf.d/
COPY index.html /usr/share/nginx/html