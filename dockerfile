FROM node:latest
# replace this with your application's default port
EXPOSE 64128

#создаем папку, где будет наша программа
RUN mkdir -p /home/server

#идем в папку
WORKDIR /home/server

#копируем все файлы из текущего пути к файлу Docker на вашей системе в нашу новую папку образа
COPY ./package.json /home/server

RUN npm i -g npm-check-updates
RUN ncu -u
RUN npm install
RUN npm install --dotenv-extended
RUN npm install socketio-auth --save
CMD ["node", "server.js"]


#docker build --rm -t server .
#docker run -d -p 64128:64128 server