const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const router = express();
const AutorizacionesModels = require("../models/AutorizacionesModels");
const pacienteModel = require("../models/UsuariosModels");

router.set('view engine', 'ejs');
router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));
/////////// BOOTCAMPS /////////
//uris de de bootcamcoursesps
//traer todos los bootcamps
router.get('/crear', async (req, res) => {
  const pacientes = await pacienteModel.find({ role: 'Paciente' });
  res.render('registro', { pacientes });
 });


router.get('/citas.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../complementos', 'css', 'citas.css'));
});

/////////// BOOTCAMPS /////////
//uris de de bootcamcoursesps
//traer todos los bootcamps
router.get("/", async (request, response) => {
  try {
    const courses = await AutorizacionesModels.find();

    if (courses.length === 0) {
      return response.status(404).json({
        sucess: false,
        msg: " No hay courses disponible",
      });
    }
    response.status(200).json({
      sucess: true,
      results: courses,
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
router.get("/:id",
 async (request, response) => {
  try {
    //TRAER PARAMTRO ID DE LA URI
    const coursesId = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(coursesId)) {
      response.status(500).json({
        sucess: false,
        msg: "Identificador invalido",
      });
    } else {
      const selected_courses = await AutorizacionesModels.findById(coursesId);
      if (!selected_courses) {
        response.status(200).json({
          sucess: true,
          results: selected_courses,
        });
      } else {
        response.status(200).json({
          sucess: true,
          results: selected_courses,
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
//crear todos los courses
router.post("/", async (request, response) => {
  try {
   
    const courses = await AutorizacionesModels.create(request.body);
    const pacientes = await pacienteModel.find({ role: 'Paciente' });
    response.render('registro', { pacientes });
/*
    response.status(201).json({
      sucess: true,
      data: courses,
    });

    */
  } catch (error) {
    response.status(500).json({
      succes: false,
      msg: error.message,
    });
  }
});

//////////////////////////////////////////
//actualizar bootcamp por id
router.put("/:id", async (request, response) => {
  try {
    const coursesId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(coursesId)) {
      response.status(500).json({
        sucess: false,
        msg: "Identificador invalido",
      })
    } else {
      const selected_courses = await AutorizacionesModels.findByIdAndUpdate(
        coursesId,
        request.body,
        {
          new: true,
        }
      )
      if (!selected_courses) {
        response.status(404).json({
          sucess: false,
          msg: "No se hallo el courses con id:" + coursesId,
        })
      } else {
        response.status(200).json({
          sucess: true,
          results: selected_courses,
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

////////////////////////////////
//eliminar courses por id
router.delete("/:id", async (request, response) => {
    coursesId = request.params.id;
  const dltCourses = await AutorizacionesModels.findByIdAndDelete(
    coursesId,
    request.body,
    {
      new: true,
    }
  );
  response.status(200).json({
    sucess: true,
    results: dltCourses,
  });
});

module.exports = router;
