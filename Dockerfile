FROM node:12-alpine AS base
WORKDIR /app

FROM base as build
COPY ./package*.js* /app/
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm install

COPY ./config /app/config
COPY ./public /app/public
COPY ./src /app/src
COPY ./test /app/test
COPY ./*.js /app/

RUN npm run build
RUN npm run test:components

FROM base as release

COPY --from=build /app/build /app/build
COPY --from=build /app/config /app/config
COPY --from=build /app/*.js* /app/

RUN npm install --only=prod

EXPOSE 5000
CMD ["npm", "start"]