const mongoose= require('mongoose')

const servidor_mongo = process.env.MONGO_URL

//funcion de conexion 
async function connectDB (){
const conn = await mongoose.connect(process.env.MONGO_URL)
console.log('Conectado a mongo'.bgMagenta.blue )
}

module.exports = connectDB