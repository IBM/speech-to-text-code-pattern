FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:1 AS base

USER 1001

WORKDIR /opt/app-root/src

FROM base as build
COPY --chown=1001:1001 ./package*.js* /opt/app-root/src/
RUN chmod 777 /opt/app-root/src/package-lock.json

RUN npm set progress=false && \
  npm config set depth 0 && \
  npm ci --only-production --ignore-scripts

COPY ./config /opt/app-root/src/config
COPY ./public /opt/app-root/src/public
COPY ./src /opt/app-root/src/src
COPY ./test /opt/app-root/src/test
COPY ./*.js /opt/app-root/src/

RUN npm run build
RUN npm run test:components

FROM base as release

USER 1001

COPY --from=build /opt/app-root/src/build /opt/app-root/src/build
COPY --from=build /opt/app-root/src/config /opt/app-root/src/config
COPY --from=build /opt/app-root/src/*.js* /opt/app-root/src/

RUN npm install --only=prod

ENV PORT 5000

EXPOSE 5000
CMD ["npm", "start"]
