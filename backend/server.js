
const app = require('./app');
//server created
const PORT = 5000;
app.listen(PORT,()=>{
console.log(`Backend Running on http://localhost:${PORT}`); 
})
