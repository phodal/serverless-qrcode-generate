var QRCode = require('qrcode')
var fs = require('fs');

QRCode.toDataURL('some text', { errorCorrectionLevel: 'H' }, function (err, url) {
  console.log(url)

  var buf = new Buffer(url.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  fs.writeFile('image.png', buf);
});
