'use strict';

const _ = require('lodash');
'use strict';

const env = require('./config/env.js');
const auth = require('./auth-check.js');


/**
 * Initiates API layer
 * @param  {object} app     express app
 * @param  {Connector} mongoDb - instance of mongodb connector
 */
module.exports = function API(app, MongoDB, uId) {

  auth.ensureAuthentication(app, uId);

  /**
   * Returns modified location objects
   * Location object contains:
   *  - id
   *  - location data
   *  - blog title
   */
  app.get('/locations', function (req, res) {
    let locationResult = MongoDB.getAll();

    locationResult.then((dbResult) => {
      let locationObjs = dbResult.map(location => {
        let locObj = {
          _id: location._id,
          location: location.location
        };

        if (_.has(location, 'blog')) {
          locObj.blog = {
            blogTitle: _.get(location, 'blog.blogTitle')
          };
        }

        return locObj;
      });

      res.send({
        success: true,
        locations: locationObjs
      });
    }).catch((err) => {
      res.send({
        success: false,
        err
      });
    });
  });

  /**
   * Returns all location-objects unmodified including their blogs (if existing)
   */
  app.get('/locations/blogs', function (req, res) {
    var dbResult = MongoDB.getAll();
    dbResult.then((result) => {
      res.send({
        success: true,
        data: result
      });
    }).catch((err) => {
      res.send({
        success: false,
        err
      });
    });
  });

  /**
   * Get specific location-object by id
   */
  app.get('/locations/:id', function (req, res) {
    let locationResult = MongoDB.getLocation(req.params.id);

    locationResult.then((dbResult) => {
      res.send({
        success: true,
        dbResult: dbResult
      });
    }).catch((err) => {
      res.send({
        sucess: false,
        err
      });
    });
  });

  /**
   * Add new location-object to Db
   */
  app.post('/locations', function (req, res) {
    let insertResult = MongoDB.addNewLocation(req.body.data);

    insertResult.then((dbResult) => {
      res.send({
        success: true,
        dbResult: dbResult
      });
    }).catch((err) => {
      res.send({
        sucess: false,
        err
      });
    });
  });

  /**
   * Update multiple or singel location-object
   */
  app.put('/locations', function (req, res) {
    let updateResult;

    if (Array.isArray(req.body)) {
      updateResult = MongoDB.updateLocations(req.body.data);
    } else {
      updateResult = MongoDB.updateLocation(req.body.data);
    }

    updateResult.then((dbResult) => {
      res.send({
        success: true,
        dbResult: dbResult
      });
    }).catch((err) => {
      res.send({
        sucess: false,
        err
      });
    });
  });

  /**
   * Delete blog from location-object
   */
  app.delete('/locations/blog/:id', function (req, res) {
    let updateResult = MongoDB.removeBlogFromLocation(req.params.id);

    updateResult.then(() => {
      res.send({
        success: true
      });
    }).catch((err) => {
      res.send({
        sucess: false,
        err
      });
    });
  });

  /**
   * Delete location-object by id
   */
  app.delete('/locations/:id', function (req, res) {
    let deleteResult = MongoDB.deleteLocation(req.params.id);

    deleteResult.then(() => {
      res.send({
        success: true,
      });
    }).catch((err) => {
      res.send({
        success: false,
        err
      });
    });
  });


  /**
   * Render views
   */
  app.get('*', (req, res) => {
    let CSSpathProd = '/css/bundle.css?t=' + new Date().getTime(); // cache

    res.cookie('env', env);
    res.render('index', {cssPath: CSSpathProd, env: process.env.NODE_ENV});
  });
};
