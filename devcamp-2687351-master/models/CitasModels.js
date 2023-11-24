const mongoose = require('mongoose')

const CitasSchema = mongoose.Schema({
    Fecha:{ 
        type: Date,
        required: [true , "fecha requerida "],
        
    },
    Hora :{
        type: String,
        required: [true , "Hora requerida "],
        
    }, 
    Autorizacion:{
        type: Number,
        required:[ true , "autorizacion requerida"],
     
    },
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
      },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
      },
    estado:{
        type: String,
        enum:[
            "activo",
            "desactivo"
        ]
    },

    AverageRating: Number,
    createdAt: Date,

})

module.exports = mongoose.model('citas', CitasSchema)