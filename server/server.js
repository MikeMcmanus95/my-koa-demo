const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');

//Intialize app. 
const app = new Koa();
const PORT = 3000; 


//Sub-route folders
const apiRouter = require('./api');

// Logger Middleware
app.use(logger());

app.use(async(ctx, next) =>  { 
  let start = new Date();
  await next();
  let end  = new Date();
  console.log('TOTAL RESPONSE TIME', end - start);
  console.log('Message of State', ctx.state.message);
});


app.use(async (ctx, next) => { 
  ctx.state.message = await message();
  ctx.body = ctx.state.message;
})

const message = () => {
  return 'Hello World';
}



// JSON Prettier Middleware
app.use(json());
// Body Parser Middleware
app.use(bodyParser());
// // Static middlware
// app.use(static('./public'));


// Express Static Middlleware
// app.use(express.static('public'))

// // Router Middleware
app.use(apiRouter.routes())

// // Starter hello world 
// *** Cascading example ***

// app.use(async (ctx, next) => {
//   console.log('here')
//   await next();
//   console.log('finally')
// })

// app.use(async (ctx, next) => { 
//   console.log('here too');
//   ctx.body = 'Hello World';
// });

// Express Middleware
// app.use(( req, res, next) => { 
//   res.send("Hello")
// })



// Error Middleware
app.use(async (ctx, next) => {
  try {
    console.log('here')
    await next();
  } catch (err) {
    ctx.throw(err.status || 500, err.message || 'Internal Server Error');
  }
});


// Express Error Middleware
// app.use((error,req, res, next) => { 
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

// // // Start the app..
app.listen(PORT, ()=> console.log(`Server is listening on PORT ${PORT}`));