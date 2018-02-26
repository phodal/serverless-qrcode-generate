'use strict';

const AWS = require('aws-sdk');
const child_process = require('child_process');
const stream = require('stream');

const s3 = new AWS.S3();

module.exports.create = (event, context, callback) => {
  var uuid = event.pathParameters.uuid;
  if (!uuid) {
    return callback(new Error(`Please include the string in the request.`));
  }

  const key = uuid + ".pdf";
  const bucket = process.env.bucketName;


  const params = {
    Bucket: bucket,
    Key: key,
    ACL: 'public-read-write',
    Body: body,
    ContentType: 'application/pdf'
  };

  s3.putObject(params, function (err, data) {
    if (err) {
      return callback(new Error(`Failed to put s3 object: ${err}`));
    }

    const response = {
      statusCode: 302,
      headers: {
        location: `https://s3-eu-west-1.amazonaws.com/${bucket}/${key}`
      }
    };

    return callback(null, response);
  });
};
