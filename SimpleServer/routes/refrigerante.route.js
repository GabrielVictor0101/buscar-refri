const express = require('express');
const app = express();
const refrigeranteRoutes = express.Router();

let Refrigerante = require('../model/Refrigerante');

// api to add refrigerante
refrigeranteRoutes.route('/add').post(function (req, res) {
  let refrigerante = new Refrigerante(req.body);
  refrigerante.save()
  .then(refrigerante => {
    res.status(200).json({'status': 'success','mssg': 'refrigerante added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get refrigerantes
refrigeranteRoutes.route('/').get(function (req, res) {
  Refrigerante.find(function (err, refrigerantes){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','refrigerantes': refrigerantes});
    }
  });
});

// api to get refrigerante
refrigeranteRoutes.route('/refrigerante/:id').get(function (req, res) {
  let id = req.params.id;
  Refrigerante.findById(id, function (err, refrigerante){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','refrigerante': refrigerante});
    }
  });
});

// api to update route
refrigeranteRoutes.route('/update/:id').put(function (req, res) {
    Refrigerante.findById(req.params.id, function(err, refrigerante) {
    if (!refrigerante){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        refrigerante.marca = req.body.marca;
        refrigerante.quantidade = req.body.quantidade;
        refrigerante.tipoGarrafa = req.body.tipoGarrafa;

        refrigerante.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
refrigeranteRoutes.route('/delete/:id').delete(function (req, res) {
  Refrigerante.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = refrigeranteRoutes;