# 1단계: 빌드 단계
FROM node:20-alpine AS builder

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: 실행 단계 (Nginx)
FROM nginx:alpine

# 빌드된 결과물을 Nginx html 폴더로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 커스텀 Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]