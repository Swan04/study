"use strict";
require('babel-polyfill');
var sql = require('./businessSql.js');
var Dao = require('../config/Dao.js');
var conf = require('../config/db.js');
var mysql = require('mysql');


var pool  = mysql.createPool(conf.mysql);


var app = {};

app.FindCBAll = function(req,res) {
  var param = req.query || req.params;
  var queryParams = ['%' + param.city + '%','%' + param.name +'%','%' + param.county + '%',(param.page-1)*param.limit,Number(param.limit)];
  return Dao.query(sql.queryAll,queryParams).then((data)=>{
    return data;
  });
}





module.exports = app;

