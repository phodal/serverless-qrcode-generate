'use strict';

const AWS = require('aws-sdk');
const QRCode = require('qrcode')
const shortid = require('shortid');
const s3 = new AWS.S3();

module.exports.create = (event, context, callback) => {
  const uuid = event.pathParameters.uuid;
  if (!uuid) {
    return callback(new Error(`Please include the string in the request.`));
  }

  const qrcodeOriginData = QRCode.create('hello.png', 'Some text', {
    color: {
      dark: '#00F',  // Blue dots
      light: '#0000' // Transparent background
    }
  }, function (err) {
    if (err) throw err;
    console.log('done')
  });

  const buffer = qrcodeOriginData.modules.data;
  const key = shortid.generate();
  const params = {
    Bucket: process.env.bucketName,
    Key: key,
    ACL: 'public-read-write',
    Body: buffer,
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
  });
};
