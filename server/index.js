const express = require('express');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 2999;

app.use('/:id', express.static(path.join(__dirname, '../', '/public')));
// Not sure if CORS is needed:
app.use(cors());

app.use('/:id/pictures/:id', createProxyMiddleware({ target: 'http://3.15.203.117/' }));
app.use('/:id/similar/:id', createProxyMiddleware({ target: 'http://52.207.78.191/' }));
app.use('/:id/bag/:id', createProxyMiddleware({ target: 'http://localhost:3003/' }));
app.use('/:id/reviews/:id', createProxyMiddleware({ target: 'http://18.223.24.49:3002/' }));

app.get('/', (req, res) => {
  res.send('Hello from MYKEA! Please go to a product endpoint.');
});

app.listen(port, () => {
  console.log(`Proxy server listening at port: ${port}`);
});
