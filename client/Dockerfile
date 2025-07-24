FROM node:22

RUN groupadd -g 1001 clientgroup && useradd -r -u 1001 -g clientgroup developer

WORKDIR /app

COPY --chown=developer:clientgroup /client/package*.json ./

RUN ["npm", "ci"]

COPY --chown=developer:clientgroup /client .

RUN chown developer:clientgroup /app
USER developer

EXPOSE 3000

CMD ["npm", "run", "dev"]
