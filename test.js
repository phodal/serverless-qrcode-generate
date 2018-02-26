var QRCode = require('qrcode')

QRCode.toDataURL('some text', { errorCorrectionLevel: 'H' }, function (err, url) {
  console.log(url)
});
