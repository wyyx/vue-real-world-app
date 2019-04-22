const axios = require('axios')

module.exports = app => {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  app.get('/api/getDiscList', (req, res) => {
    axios
      .get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      })
      .then(response => {
        // console.log('response.data', response.data)
        res.json(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  })

  app.get('/api/lyric', (req, res) => {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios
      .get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      })
      .then(response => {
        var ret = response.data
        if (typeof ret === 'string') {
          var reg = /^\w+\(({[^()]+})\)$/
          var matches = ret.match(reg)
          if (matches) {
            ret = JSON.parse(matches[1])
          }
        }
        res.json(ret)
      })
      .catch(e => {
        console.log(e)
      })
  })
}
