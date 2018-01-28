'use strict';

/**
 * Loader image lazily with the help of data-src tag
 * @param {DOM} htmlImg - DOM image element
 */
export default function imageLoader(htmlImg) {
  htmlImg.setAttribute('src', htmlImg.getAttribute('data-src'));
  htmlImg.onload = function () {
    htmlImg.removeAttribute('data-src');
  };
}
