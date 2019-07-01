FROM node:10.15.3

WORKDIR /usr/src/app
COPY . .

ENV MONGO_URL=mongodb://digitallab:uTVF9CVtDCBXZ46@ds121212.mlab.com:21212/tree

ENV PORT=4200

ENV IACA_ADRESS=http://iaca:4000

RUN npm install
RUN yarn build-ts

CMD ["npm","run","serve"]

EXPOSE 4200