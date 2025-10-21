FROM node:24.1.0-alpine AS build
WORKDIR /app

# Копируем файлы из корня проекта (относительно Dockerfile)
COPY ./../../package.json ./../../decorate-angular-cli.js ./../../nx.json ./../../tsconfig.base.json ./

# Устанавливаем зависимости
RUN npm install --force

# Копируем папку admin-panel (относительно Dockerfile)
COPY ./../../apps/admin-panel ./apps/admin-panel

# Собираем проект
RUN npx nx build admin-panel --prod

# Финальный образ (если нужно)
 FROM nginx:1.25.1-alpine
 COPY ./../../nginx/default.conf /etc/nginx/conf.d/default.conf
 COPY --from=build /app/dist/apps/admin-panel /usr/share/nginx/html
