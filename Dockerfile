FROM node:20-alpine
WORKDIR /app

# Cài OpenSSL để Prisma detect ổn định
RUN apk add --no-cache openssl

# Chỉ copy file manifest trước để tối ưu cache layer
COPY package*.json ./

# Copy schema trước khi npm install (vì postinstall gọi prisma generate)
COPY prisma ./prisma

# Cài dependencies (nếu có package-lock.json, dùng npm ci cho reproducible)
# Bạn có thể dùng npm install nếu thích:
# RUN npm install
RUN npm ci

# Generate client (an toàn dù postinstall đã chạy)
RUN npx prisma generate

# Copy phần còn lại của source
COPY . .

EXPOSE 3000

# Khi container start: apply migrations rồi chạy server
CMD ["sh","-c","npx prisma migrate deploy && node src/server.js"]
