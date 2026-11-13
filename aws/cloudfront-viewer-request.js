/* eslint-disable no-unused-vars */
// CloudFront Function: Viewer Request
// Runtime: cloudfront-js-2.0
// Purpose: Seamless SPA URL rewrites for React Single Page Applications hosted on S3
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // If request is root or explicitly requests a file with an extension (e.g., .js, .css, .png, .pdf, .xml, .txt)
  if (uri === '/' || uri.includes('.')) {
    return request;
  }

  // Rewrite subpath routes (e.g. /projects, /about, /skills) to /index.html
  // S3 serves index.html with HTTP 200 without exposing 403/404 errors
  request.uri = '/index.html';
  return request;
}
