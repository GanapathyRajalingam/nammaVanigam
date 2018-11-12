var loopback = require('loopback');
var logger = require('oe-logger');
var log = logger('create-system-data');
var async = require('async');

module.exports = function (app) {
  var uicomponents = [
    {
      id: '4aca9774-f4d9-11e6-bc64-92361f000012',
      name: 'purchases-form',
      modelName: 'Purchase',
      autoInjectFields: false
    },
    {
      id: '4bca9775-f4d9-11e8-bc64-92361f100012',
      name: 'jewellery-type-form',
      modelName: 'JewelleryType',
      autoInjectFields: false
    },
    {
      id: '4cca9784-f4d9-12e6-bc64-92361f001012',
      name: 'purity-form',
      modelName: 'Purity',
      autoInjectFields: false
    },
    {
      id: '4aca9974-f6d9-14e6-bc64-92361f200012',
      name: 'item-type-form',
      modelName: 'ItemType',
      autoInjectFields: false
    },
    {
      id: '4aca9374-f2d9-12e6-bc64-92161f011012',
      name: 'inventory-form',
      modelName: 'Stock',
      autoInjectFields: false
    }
  ];

  var context = {
    ignoreAutoScope: true,
    fetchAllScopes: true,
    ctx: {
      tenantId: 'default'
    }
  };

  var UIComponent = loopback.getModelByType('UIComponent');
  UIComponent.purge({}, context, function(err, info) {
    console.log(err, info.count);
    async.forEachLimit(uicomponents, 1, function(item, done) {
      UIComponent.create(item, context, function(err, rec) {
        if (err) {
          console.log(' error in uicomponent upload ', item.name, err);
        }
        done(null, rec);
      });
    });
  });

  // async.forEachSeries(uicomponents, function(item, cb) {
  //   UIComponent.findById(item.id, context, function(err, dbrec) {
  //     if (err) {
  //       return cb(err);
  //     }
  //     if (!dbrec) {
  //       UIComponent.create(item, context, function(err, dbrec) {
  //         if (err) {
  //           console.log("insert error ",err, item.name, item.id);
  //         }
  //         return cb(null, dbrec);
  //       });
  //     } else {
  //       dbrec.updateAttributes(item, context, function(err, dbrec) {
  //         if (err) {
  //           console.log("update  error ", err, item);
  //         }
  //         return cb(null, dbrec);
  //       });
  //     }
  //   });
  // });
};
