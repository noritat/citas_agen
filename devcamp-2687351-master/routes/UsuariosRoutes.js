const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const router = express();
const UsuariosModels = require("../models/UsuariosModels");
router.set('view engine', 'ejs');
router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: true }));
/////////// BOOTCAMPS /////////
//uris de de bootcamcoursesps
//traer todos los bootcamps
router.get('/crear', (req, res) => { res.render('pacientes', { UsuariosModels }); });
router.get('/crearm', (req, res) => { res.render('medicos', { UsuariosModels }); });
router.get('/inicio', (req, res) => {
  let mensaje=null;
   res.render('login', { mensaje });
   });

/////////// BOOTCAMPS /////////
//uris de de bootcamps


router.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../complementos', 'css', 'style.css'));
});

router.get('/hospital.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '../complementos', 'img', 'hospital.jpg'));
});


//traer todos los bootcamps
router.get("/medicoC", async (request, response) => {
  try {
    const bootcamps = await UsuariosModels.find();

    if (bootcamps.length === 0) {
      return response.status(404).json({
        sucess: false,
        msg: " No hay bootcamps disponible",
      });
    }
    response.status(200).json({
      sucess: true,
      results: bootcamps,
    });
  } catch (error) {
    response.status(500).json({
      succes: false,
      msg: "Error interno del servidor",
    });
  }
});

//////////////////////////////////
//traer todos los bootcamp con id/5
router.get("/:id", async (request, response) => {
  try {
    //TRAER PARAMTRO ID DE LA URI
    const bootcampId = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      response.status(500).json({
        sucess: false,
        msg: "Identificador invalido",
      });
    } else {
      const selected_bootcamp = await UsuariosModels.findById(bootcampId);
      if (!selected_bootcamp) {
        response.status(200).json({
          sucess: true,
          results: selected_bootcamp,
        });
      } else {
        response.status(200).json({
          sucess: true,
          results: selected_bootcamp,
        });
      }
    }
  } catch (error) {
    response.status(500).json({
      succes: false,
      msg: error.message,
    });
  }
});


router.get("/:fecha", async (request, response) => {
  try {
    //TRAER PARAMTRO ID DE LA URI
    const bootcampId = request.params.fecha;

    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      response.status(500).json({
        sucess: false,
        msg: "Identificador invalido",
      });
    } else {
      const selected_bootcamp = await UsuariosModels.findById(bootcampId);
      if (!selected_bootcamp) {
        response.status(200).json({
          sucess: true,
          results: selected_bootcamp,
        });
      } else {
        response.status(200).json({
          sucess: true,
          results: selected_bootcamp,
        });
      }
    }
  } catch (error) {
    response.status(500).json({
      succes: false,
      msg: error.message,
    });
  }
});



//////////////////////////////
//crear todos los bootcamps
router.post("/crear", async (request, response) => {
  request.body["role"] = "Paciente";

  let mensaje = "";
  try {
    const bootcamp = await UsuariosModels.create(request.body);

    mensaje = "Paciente creado con exito";
  
    response.render('login', {mensaje});
  } catch (error) {
    mensaje="Error, "+error.message;
    response.render('pacientes', {mensaje});
  }
 
});
/**PACIENTE */
router.post("/crearm", async (request, response) => {
  request.body["role"] = "Medico";
  let mensaje = "";
  try {
    const bootcamp = await UsuariosModels.create(request.body);

    mensaje = "Medico creado con exito";
 
    response.render('login', {mensaje});
  } catch (error) {
    mensaje="Error, "+error.message;
    response.render('medicos', {mensaje});
  }
});

//////////////////////////////////////////
/*actualizar bootcamp por id
router.put("/:id", async (request, response) => {
  try {
    const bootcampId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      response.status(500).json({
        sucess: false,
        msg: "Identificador invalido",
      })
    } else {
      const selected_bootcamp = await UsuariosModels.findByIdAndUpdate(
        bootcampId,
        request.body,
        {
          new: true,
        }
      )
      if (!selected_bootcamp) {
        response.status(404).json({
          sucess: false,
          msg: "No se hallo el bootcamps con id:" + bootcampId,
        })
      } else {
        response.status(200).json({
          sucess: true,
          results: selected_bootcamp,
        })
      }
    }
  } catch (error) {
    response.status(500).json({
      succes: false,
      msg: error.message
    })
  }
})
*/



router.post("/inicio", async (request, response) => {
  const { email, password } = request.body;

  let mensaje=null;
  try {
    const user = await UsuariosModels.findOne({ email: email, password: password });

    if (!user) {
    
     mensaje='Usuario no encontrado o sin contraseña definida';
      response.render('login', { mensaje });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const passwordMatch = await bcrypt.compare(password, passwordHash);

      if (!passwordMatch) {
        // Contraseña incorrecta
        console.log('Contraseña o correo incorrecta ');
        response.redirect('/login');
      } else {
      
        // Inicio de sesión exitoso
      
        if(user.role=='Paciente'){
          request.session.id_paciente = user._id;
        response.render('paginaP');
        }else if(user.role=='Medico'){
          request.session.id_medico = user._id;
          response.render('paginaM');
        }else{
          response.render('paginaA');
        }
      }
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error al intentar iniciar sesión:', error);
    response.status(400).json({
      success: false,
      msg: error.message,
    });
  }
});




module.exports = router;
