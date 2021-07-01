FROM node:10
WORKDIR /app
COPY package.json /app
# RUN if [ "$NODE_ENV" = "development" ]; \
#     then npm install; \
#     else npm install --only=production; \
#     fi
RUN npm install
# COPY . /app
COPY . .
# ENV PORT 3000
# EXPOSE $PORT
# CMD node app.js
# CMD ["node","index.js"]
CMD ["npm", "run", "dev"]