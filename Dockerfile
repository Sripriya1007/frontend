# Step 1: Set the base image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the source code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use nginx to serve the app
FROM nginx:stable-alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Step 8: Expose port
EXPOSE 80

# Step 9: Start nginx
CMD ["nginx", "-g", "daemon off;"]
