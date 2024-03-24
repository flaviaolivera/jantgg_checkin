## Ejecutar con Docker

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.
2. Clona este repositorio y navega al directorio del proyecto.
3. Ejecuta `docker-compose up --build` para construir y levantar la aplicación y la base de datos.
4. Ejecuta `docker exec <ID DE LA APP EN DOCKER> npx sequelize-cli db:migrate` para migrar las tablas a la base de datos.
5. Utiliza la biblioteca de postman (checkin.postman_collection) para generar y modificar los productos, en primer lugar registra el usuario, logeate con él y utiliza el token para interactucar con la api.

## Operaciones disponibles

- POST `/api/productos`: Añade un nuevo producto.
- GET `/api/productos`: Lista todos los productos.
- GET `/api/productos/:id`: Obtiene los detalles de un producto específico.
- PUT `/api/productos/:id`: Actualiza un producto existente.
- DELETE `/api/productos/:id`: Elimina un producto.

