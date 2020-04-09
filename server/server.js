const Koa = require('koa');

// Create app

const app = new Koa();
const PORT = 3000;

// Start app...
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
