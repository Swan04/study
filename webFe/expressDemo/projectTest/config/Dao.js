"use strict";
require('babel-polyfill');
var mysql = require('mysql');
var conf = require('./db.js');


var pool  = mysql.createPool(conf.mysql);

var Dao = {
	getConnection:function() {
       return new Promise(function(resolve,reject){
           pool.getConnection(function(err,connection){
               resolve(connection);
           });
       })
	},
	query:function(sql,queryParams) {
		return this.getConnection().then(connection=>{
            return new Promise((resolve,reject) => {
               connection.query(sql,queryParams,(err,result)=>{
                  resolve(result);
               })
            })
		})
	}

}

module.exports = Dao;