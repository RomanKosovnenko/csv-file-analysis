FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS server
RUN apk add g++ make py3-pip pkgconfig pixman-dev cairo-dev pango-dev ttf-dejavu ttf-freefont
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/dist ./dist
EXPOSE 8000
CMD ["npm", "start"]
