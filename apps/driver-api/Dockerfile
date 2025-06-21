FROM node:24.1.0-alpine
WORKDIR /app
COPY /apps/driver-api/dist/package*.json ./

# Install production dependencies
RUN npm i && \
    npm i mysql core-js

# Copy built application
COPY /apps/driver-api/dist/main.js ./

EXPOSE 3000
CMD ["node", "main.js"]