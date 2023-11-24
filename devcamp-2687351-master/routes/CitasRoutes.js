
const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const router = express();
const CitasModels = require("../models/CitasModels");
router.set('view engine', 'ejs');
router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));
const medicoModel = require("../models/UsuariosModels");
const AutorizacionesModels = require("../models/AutorizacionesModels");
const UsuariosModels = require("../models/UsuariosModels");

/////////// BOOTCAMPS /////////
//uris de de bootcamcoursesps
//traer todos los bootcamps
router.get('/crear', async (req, res) => {
  let mensaje = null;
  const medicos = await medicoModel.find({ role: 'Medico' });

  const autos = await AutorizacionesModels.find({ paciente: req.session.id_paciente });

  res.render('cita', { autos, medicos, mensaje });
});
router.get('/pagina', (req, res) => { res.render('paginaM', { CitasModels }); });
router.get('/consultaC', async (req, res) => {
  const miscitas = await CitasModels.find({ paciente: req.session.id_paciente });

  res.render('citapaciente', { miscitas });

});
router.get('/citas.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../complementos', 'css', 'citas.css'));
});
router.get('/paginam.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../complementos', 'css', 'paginam.css'));
});

router.get('/consulta.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '../complementos', 'img', 'consulta.jpg'));
});

router.get('/hospital1.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '../complementos', 'img', 'hospital1.jpg'));
});
router.get('/crearcita.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../complementos', 'img', 'crearcita.png'));
});
/////////// reviews /////////
//uris de de reviews
//traer todos los reviews
router.get("/", async (request, response) => {
  try {
    const reviews = await CitasModels.find();

    if (reviews.length === 0) {
      return response.status(404).json({
        sucess: false,
        msg: " No hay reviews disponible",
      });
    }
    response.status(200).json({
      sucess: true,
      results: reviews,
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
      const reviewsId = request.params.id;

      if (!mongoose.Types.ObjectId.isValid(reviewsId)) {
        response.status(500).json({
          sucess: false,
          msg: "Identificador invalido",
        });
      } else {
        const selected_reviews = await CitasModels.findById(reviewsId);
        if (!selected_reviews) {
          response.status(200).json({
            sucess: true,
            results: selected_reviews,
          });
        } else {
          response.status(200).json({
            sucess: true,
            results: selected_reviews,
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
//crear todos los Reviews
router.post("/", async (request, response) => {
  request.body["estado"] = "activo";
  request.body["paciente"] = request.session.id_paciente;
  let mensaje = "";
  const autos = await AutorizacionesModels.find({ paciente: request.session.id_paciente });
  const medicos = await medicoModel.find({ role: 'Medico' });
  try {


    const valida = await CitasModels.find({ 
      paciente: request.session.id_paciente,
       Fecha: request.body["Fecha"],
        Hora: request.body["Hora"] });
   
    if (valida==0) {

      const reviews = await CitasModels.create(request.body);
      mensaje = "cita creada con exito";
    } else {
      mensaje = "cita no se puede crear el mismo dia a la misma hora";
    }





  } catch (error) {

    mensaje = "Error, " + error.message;
  }
  response.render('cita', { medicos, autos, mensaje });

});

//////////////////////////////////////////
//actualizar bootcamp por id
router.put("/:id", async (request, response) => {
  try {
    const reviewsId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(reviewsId)) {
      response.status(500).json({
        sucess: false,
        msg: "Identificador invalido",
      })
    } else {
      const selected_reviews = await CitasModels.findByIdAndUpdate(
        reviewsId,
        request.body,
        {
          new: true,
        }
      )
      if (!selected_reviews) {
        response.status(404).json({
          sucess: false,
          msg: "No se hallo el reviews con id:" + reviewsId,
        })
      } else {
        response.status(200).json({
          sucess: true,
          results: selected_reviews,
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
//eliminar reviews por id
router.delete("/:id", async (request, response) => {
  reviewsId = request.params.id;
  const dltReviews = await CitasModels.findByIdAndDelete(
    reviewsId,
    request.body,
    {
      new: true,
    }
  );
  response.status(200).json({
    sucess: true,
    results: dltReviews,
  });
});




router.get("/agendas", async (request, response) => {
  // Obtener las agendas disponibles
  const agendas = await AgendasModels.find({
    state: "disponible",
  });

  // Enviar las agendas al cliente
  response.json(agendas);
});

module.exports = router;
