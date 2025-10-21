FROM node:24.1.0-alpine
WORKDIR /app
#COPY /apps/admin-api/dist/package*.json ./
COPY ./../../apps/admin-api/dist/package*.json ./
# Install production dependencies
#RUN npm i && \
#    npm i mysql core-js \

RUN npm install

# Copy built application
#COPY /apps/admin-api/dist/main.js ./
#COPY /apps/admin-api/dist/migrations ./migrations

COPY ./../../apps/admin-api/dist/main.js ./
COPY ./../../apps/admin-api/dist/migrations ./migrations

#WORKDIR /app/apps/admin-api/dist

# RUN npm run migration:run

EXPOSE 3000
CMD ["node", "main.js"]