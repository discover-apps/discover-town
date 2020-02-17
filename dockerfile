FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy entire directory to docker image
COPY . .

# Delete and Reinstall Dependencies (eliminate OS conflicts)
RUN rm -rf node_modules/
RUN npm install

# Build server / client bundles with webpack
RUN npm run build

# Install PM2 Globally
RUN npm install pm2 -g

# Change working directory
WORKDIR /usr/src/app/dist

EXPOSE 3000

# Use PM2 to serve static server
CMD ["pm2-runtime", "server.bundle.js"]