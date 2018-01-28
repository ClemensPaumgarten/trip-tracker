'use strict';

import * as firebase from 'firebase/app';

export default function deleteStorageFiles(downloadURLs = []) {
  return new Promise((resolve) => {

    // if now download urls exit function
    if (downloadURLs.length === 0) {
      return resolve();
    }

    downloadURLs.forEach((url, index, urls) => {
      var storage = firebase.storage();
      var httpsReference = storage.refFromURL(url);
      httpsReference.delete().then(function () {
        if (index === urls.length - 1) {
          resolve();
        }
      }).catch(function () {
        if (index === urls.length - 1) {
          resolve();
        }

      });
    });
  });
}
