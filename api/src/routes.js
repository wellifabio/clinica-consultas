const express = require('express');
const routes = express.Router();

const Consulta = require('./controllers/consulta');

routes.get('/', (req, res) => {
  res.json({ titulo: 'Clínica ACME' });
});

routes.post('/consultas', Consulta.create);
routes.get('/consultas', Consulta.read);
routes.put('/consultas/:id', Consulta.update);
routes.delete('/consultas/:id', Consulta.del);

module.exports = routes;