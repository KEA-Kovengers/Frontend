# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json .

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source
COPY . .

# # Make port 3000 available to the world outside this container
EXPOSE 3000

# RUN npm build

# Run the app when the container launches
CMD ["npm", "start"]

# RUN yarn dev
# FROM node:20-alpine AS base

# # INSTALL DEPENDENCIES FOR DEVELOPMENT (FOR NEST)
# FROM base AS deps
# WORKDIR /usr/src/app

# COPY --chown=node:node package.json ./
# RUN yarn;

# USER node

# # INSTALL DEPENDENCIES & BUILD FOR PRODUCTION
# FROM base AS build
# WORKDIR /usr/src/app

# COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node . .

# ENV NODE_ENV production


# RUN yarn build

# RUN yarn --frozen-lockfile --production;


# USER node

# # PRODUCTION IMAGE
# FROM base AS production
# WORKDIR /usr/src/app

# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# # COPY --chown=node:node --from=build /usr/src/app/.env ./

# CMD [ "node", "dist/src/main.js" ]

