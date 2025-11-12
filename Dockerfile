# ---- Base image ----
FROM node:18

# ---- Set working directory ----
WORKDIR /app

# ---- Copy package files ----
COPY package*.json ./

# ---- Install dependencies ----
RUN npm install

# ---- Copy the app code ----
COPY . .

# ---- Expose backend port ----
EXPOSE 5000

# ---- Environment variables ----
ENV PORT=5000

# ---- Start command ----
CMD ["npm", "run", "dev"]
