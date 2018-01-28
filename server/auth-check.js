'use strict';

const _ = require('lodash');
const admin = require('firebase-admin');

/**
 * Ensure authentication on routes of all types except GET
 * @param {object} app - Express app
 * @param {string} uId - userid
 */
function ensureAuthentication(app, uId) {
  app.use('*', function (req, res, next) {
    if (req.method === 'GET') {
      next();
    } else {
      let payload = req.body;

      if (_.has(payload, 'jwt')) {
        authenticateJWT(payload.jwt, uId).then(() => {
          next();
        }).catch((err) => {
          return res.send({
            success: false,
            errorMsg: 'Invalid User',
            err
          });
        });
      } else {
        res.send({
          success: false,
          errorMsg: 'Invalid User'
        });
      }
    }
  });
}

/**
 * Handles JWT authentication with firebase endpoint
 * @param {string} jwt
 * @param {string} uId
 */
function authenticateJWT(jwt, uId) {
  return new Promise(function (resolve, reject) {
    admin.auth().verifyIdToken(jwt).then(function (decodedToken) {
      if (decodedToken.user_id === uId) {
        resolve();
      } else {
        reject();
      }
    }).catch(function (err) {
      reject(err);
    });
  });
}

exports.ensureAuthentication = ensureAuthentication;
