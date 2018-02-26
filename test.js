var QRCode = require('qrcode')

QRCode.toDataURL('I am a pony!', function (err, url) {
    console.log(url)
})
