FROM registry.access.redhat.com/ubi8/ubi AS base

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs

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