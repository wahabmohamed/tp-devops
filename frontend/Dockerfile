FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install --silent

COPY . .
RUN npm run build

FROM nginx:1.25-alpine

# Copy built static assets to nginx web root
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
