# Usar uma imagem base oficial do Nginx
FROM nginx:alpine

# Copiar os arquivos HTML e JavaScript para o diretório do servidor Nginx
COPY index.html /usr/share/nginx/html/
COPY js/scripts.js /usr/share/nginx/html/js/
# Expor a porta 80 para acesso externo
EXPOSE 80