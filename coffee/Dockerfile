# Stage 1
FROM node:14.15.4 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build --prod

# Stage 2
FROM nginx:latest
COPY --from=build-step /app/dist/coffee /usr/share/nginx/html

# Expose port 80
EXPOSE 80