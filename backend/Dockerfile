FROM node:24
#uso la version24(lts)

WORKDIR /app

COPY ./package*.json /app

#solo se ejecuta si meto nuevas dependencias en el proyecto, entonces se tiene que volver
#a buildear la imagen
RUN npm install

COPY . /app

# 4. Comando de encendido

CMD ["npm", "run", "dev"]