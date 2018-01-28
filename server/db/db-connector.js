'use strict';

// database
const ObjectID = require('mongodb').ObjectID;

class Connector {
  constructor(col, db) {
    this.col = db.collection(col);
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      this.col.deleteMany({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  deleteLocation(id) {
    return new Promise((resolve, reject) => {
      this.col.remove({
        '_id': ObjectID(id)
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.col.find({}).toArray(
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  }

  getLocation(locationId) {
    return new Promise((resolve, reject) => {
      this.col.find(ObjectID(locationId)).toArray((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  addNewLocation(location) {
    return new Promise((resolve, reject) => {
      this.col.insert(location, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  updateLocations(locations) {
    return new Promise((resolve, reject) => {
      locations.forEach((location, i) => {
        location._id = ObjectID(location._id);

        this.col.update({
          '_id': location._id
        }, {
          $set: location
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            if (i === (locations.length - 1)) {
              resolve({
                numberOfUpdates: locations.length
              });
            }
          }
        });
      });
    });
  }

  removeBlogFromLocation(id) {
    id = ObjectID(id);

    return new Promise((resolve, reject) => {
      this.col.update({
        '_id': id
      }, {
        $unset: {
          blog: 1
        }
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  updateLocation(location) {
    location._id = ObjectID(location._id);

    return new Promise((resolve, reject) => {
      this.col.findOneAndUpdate({
          '_id': location._id
        },
        location, {
          returnOriginal: false

        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
    });
  }
}

module.exports = Connector;
