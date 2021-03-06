'use strict';

const AWS = require('aws-sdk');
const QRCode = require('qrcode')
const shortid = require('shortid');
const s3 = new AWS.S3();

module.exports.create = (event, context, callback) => {
  let string = event.queryStringParameters.q;
  if (!string) {
    return callback(new Error(`Please include the string in the request.`));
  }

  const key = shortid.generate();
  QRCode.toDataURL(string, {
    errorCorrectionLevel: 'H',
    width: 512,
    margin: 2,
    color: {
      light: '#fdfdfd',
      dark: '#384452'
    }
  }, function (err, url) {
    const params = {
      Bucket: process.env.bucketName,
      Key: key,
      ACL: 'public-read',
      Body: new Buffer(url.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
      ContentEncoding: 'base64',
      ContentType: 'image/png'
    };

    s3.putObject(params, function (err, data) {
      if (err) {
        return callback(new Error(`Failed to put s3 object: ${err}`));
      }

      const response = {
        statusCode: 302,
        headers: {
          location: `https://s3.amazonaws.com/${process.env.bucketName}/${key}`
        }
      };

      return callback(null, response);
    })
  });
};
