var QRCode = require('qrcode')

var data = QRCode.create('hello.png', 'Some text', {
  color: {
    dark: '#00F',  // Blue dots
    light: '#0000' // Transparent background
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})

console.log(data.modules.data);
