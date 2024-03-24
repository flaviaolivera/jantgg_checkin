const express = require('express');
const productosRoutes = require('./productosRoutes')
const authRoutes = require('./authRoutes'); ;
const verifyToken = require('./verifyToken');


const app = express();

app.use(express.json());

// Endpoints de user
app.use('/api', authRoutes); 

// Endpoints de productos
app.use('/api/productos', verifyToken, productosRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de la Panadería');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
