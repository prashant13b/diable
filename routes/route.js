const express = require('express'),
      router = express.Router(),
      helpers = require('../helpers/index');

    router.route('/')
    .get(helpers.index)
    .post(helpers.setname)

    router.route('/newMessage')
    .post(helpers.newMessage)
   
  router.route('/getNewMessages')
  .get(helpers.getMessage)

  router.route('/getName')
  .get(helpers.getName)

module.exports = router