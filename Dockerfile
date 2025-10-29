# Dockerfile para servir página estática com nginx
FROM nginx:alpine

# Remove o conteúdo padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia seus arquivos para o diretório servido pelo nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80