# Usar la imagen oficial de Node.js como imagen base
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de definición de paquetes al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar los archivos de tu proyecto al directorio de trabajo en el contenedor
COPY . .

# Exponer el puerto que tu aplicación utiliza
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
