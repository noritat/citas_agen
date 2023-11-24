const mongoose = require('mongoose')

const AutorizacionesSchema = mongoose.Schema({
    number:{ 
        type: Number,
        required: [true , "nombre de autorizacion requerido "],
        
    },
    name :{
        type: String,
        required: [true , "nombre de autorizacion requerido "],
        
    }, 
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
      },
    AverageRating: Number,
    createdAt: Date,

})

module.exports = mongoose.model('Autorizaciones' ,  AutorizacionesSchema)