"use strict";
require('babel-polyfill');
var express = require('express');
var router = express.Router();
var business = require('../dao/businessDao.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  business.FindCBAll(req,res).then((data)=>{
  	console.log(data);
    return res.json({'CBS':data})
  });
});

module.exports = router;