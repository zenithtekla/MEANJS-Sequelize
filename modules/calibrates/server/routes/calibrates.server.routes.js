'use strict';

module.exports = function(app){
  var endpoints = app.locals.endpoints;
  // root definition is optional
  // var root = app.get('root');

  // var module_name = app.get('module_name');
  var module_name = 'calibrates';
  var controller  = require('../controllers/' + module_name + '.server.controller');

  var points = {
    module_name: module_name,
    equipments: '/equipments',
    equipments_asset_number: '/equipments/:location_id',
    equipment: '/equipment',
    equipment_model: '/equipment/:model',
    asset_number: '/asset_number/:asset_number',
    table_equipment: '/table_equipment',
    table_main: '/table_main',
    table_location: '/table_location',
    equipment_model_asset_number: '/equipment/:model/:asset_number',
    location: '/location/:location_id'
  };
  endpoints.push(points);

  app.route(points.equipments)
    .get(controller.getEquipment)
    .post(controller.createEquipment);
  app.route(points.equipments_asset_number)
    .get(controller.getAnEquipmentBy)
    .put(controller.updateEquipment)
    // .put(controller.upsertEquipment)
    .delete(controller.deleteEquipment);

  app.route(points.equipment)
    .get(controller.getEquipment)
    // create the entire new model of equipments.
    .post(controller.createModel);

  app.route(points.equipment_model)
    .get(controller.getEquipmentBy)

    // CREATE an Equipment based on model, literally adds another asset_number to that existing model
    // and also add file, location, last_cal, schedule, ...)

    .post(controller.createEquipment)

    // UPDATE model name, only to update model field literally
    // .put(controller.updateModel)

    // DELETE the entire model
    .delete(controller.deleteModel)
  ;
  app.route(points.asset_number)
    .get(controller.getEquipmentBy)

    // UPDATE: update an Equipment by its specific asset_number
    // allow update of the following fiels: file, schedule for next_cal, location (if necessary,
    // for example from stockroom, production to shipping dept SHOULD the requirement-scheduled date be met)
    .put(controller.updateEquipment)

    // DELETE an Equipment based on model & asset_number, must delete its location
    .delete(controller.deleteEquipment);

  /*
   Additional RESTful end-points
   */
  app.get(points.table_equipment, controller.equipment)
    .get(points.table_main, controller.main)
    .get(points.table_location, controller.location);

  app.route(points.equipment_model_asset_number)
    .get(controller.getEquipmentBy);

  app.route(points.location)
    .get(controller.getEquipmentBy);

  /*app.route('/tasks').all(/!* taskPolicy.isAllowed *!/)
   .get(controller.list)
   .post(controller.create);
   app.route('/tasks/:taskId')
   .get(controller.read)
   .put(controller.update)
   .delete(controller.delete);*/

  // app.post('/upload', auth.isAuthenticated(), controller.upload);
};
