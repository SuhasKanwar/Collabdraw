FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./packages ./packages
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./
COPY ./turbo.json ./
COPY ./apps/ws-backend ./apps/ws-backend

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run db:generate

EXPOSE 8080

CMD ["pnpm", "run", "start:ws"]