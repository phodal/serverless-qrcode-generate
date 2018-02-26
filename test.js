var QRCode = require('qrcode')
var fs = require('fs');

QRCode.toDataURL('https://www.phodal.com/blog/build-hybrid-android-application-kotlin-react-natvie-dore-ionic-3/', {
  errorCorrectionLevel: 'H',
  width: 512,
  margin: 2,
  color: {
    light: '#fdfdfd',
    dark: '#384452'
  }
}, function (err, url) {
  console.log(url)

  var buf = new Buffer(url.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  fs.writeFile('image.png', buf);
});
