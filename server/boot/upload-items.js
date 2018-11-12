var loopback = require('loopback');
var async = require('async');
var path = require('path');
var fs = require('fs');
var os = require('os');
module.exports = function () {

  var context = {
        ctx: {
            tenantId: 'default'
        }
    };

    var fname = path.join(os.homedir(), '/data/items.json');
    var ItemModel = loopback.getModelByType('Item');
    fs.readFile(fname, function(err, fdata){
        if (err) {
            return err;
        }
        searchData = JSON.parse(fdata);      
        async.mapSeries(searchData, function (item, cb) {
            ItemModel.findOrCreate({
                "where": {
                    "name": item.name
                }
            }, item, context, function (err, dbrec) {
                return cb(null, dbrec);
            });
        });
    });

};