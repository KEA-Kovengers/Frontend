# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Bundle app source
COPY . .

# Install any needed packages specified in package.json
RUN npm install

RUN npm run build

# # Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]