const mongoose = require('mongoose')

//definir el modelo para bootcamps
const UsuariosSchema = mongoose.Schema({
    name:{ 
        type: String,
        
        required: [true , "nombre de bootcamp requerido "],
        maxlength: [50 , "longitud de nombre menor a 50"]
    },
    phone :{
        type: Number,
        maxlength:[10 , "longitud de telefono menor a 10"]
    }, 
    address:{
        type: String,
        required:[ true , "direccion requerida"],
    },
    email:{
        type : String,
        required: [true , "correo de user es requerido"]
    },
    password:{
        type : String,
        required: [true , "contraseña de user es requerido"]
    
    },

    role:{
        type : String,
        enum:[
            "Paciente",
            "Medico",
            "Admin"
        ]
    },
    citas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'citas' }],

    AverageRating: Number,
    createdAt: Date,

})

module.exports = mongoose.model('Usuarios' ,  UsuariosSchema)