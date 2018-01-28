'use strict';

export default function classBuilder(classes) {
  var classObj = {};

  classes.forEach((cssClass) => {
    classObj[cssClass] = true;
  });

  return classObj;
}

export function classStringBuilder(classes) {
  var classStr = '';

  classes.forEach((cssClass) => {
    classStr += ' ' + cssClass;
  });

  return classStr;
}
