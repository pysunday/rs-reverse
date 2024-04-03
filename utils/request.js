const rp = require('request-promise');
const cookieJar = rp.jar()
const request = rp.defaults({ jar: cookieJar })

module.exports = {
  request,
  cookieJar,
}
