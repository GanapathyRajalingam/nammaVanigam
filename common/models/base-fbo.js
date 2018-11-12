/**
 * ©2016 EdgeVerve Systems Limited(a fully owned Infosys subsidiary), Bangalore, India. All Rights Reserved.
 *
 * The EdgeVerve proprietary software program ("Program"), is protected by copyrights laws,
 * international treaties and other pending or existing intellectual property rights in India, the
 * United States and other countries. The Program may contain / reference third party or open source
 * components, the rights to which continue to remain with the applicable third party licensors or
 * the open source community as the case may be and nothing here transfers the rights to the third
 * party and open source components, except as expressly permitted. Any unauthorized reproduction,
 * storage, transmission in any form or by any means (including without limitation to electronic,
 * mechanical, printing, photocopying, recording or otherwise), or any distribution of this Program,
 * or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted
 * to the maximum extent possible under the law.
 **/

/**
 * Implemention of BaseFBO Model 
 * @author kpraveen
 */

//var loopback = require('loopback');
module.exports = function (BaseFBO) {
  var PersistedModel = BaseFBO.registry.getModel("PersistedModel");

  BaseFBO.setup = function () {
    PersistedModel.setup.call(this);
    var model = this;

    model.default = function (options, cb) {
      var self = this;
      var connector = self.app.datasources["ft"].connector;
      var modelNamel = self.modelName;
      var fbo_type = self.settings.fbo_type || modelNamel;

      if (connector) {
        var obj = {
          method_name: "initialiseFBO",
          fbo_type: fbo_type
        };

        connector.transieve(JSON.stringify(obj), function (err, data) {
          if (err) {
            return cb(err, null);
          }
          if (data) {
            try {
              var ret = JSON.parse(data);
            } catch (e) {
              var err = new Error('internal parse error');
              return cb(err, null);
            }
            cb(null, ret);
          } else {
            cb(null, null);
          }
        });
      }
    };

    model.remoteMethod("default", {
      accessType: "READ",
      accepts: [],
      returns: {
        arg: "fbo",
        type: "object",
        root: true
      },
      description: ["Sends a request to initialiseFBO"],
      http: {
        path: "/default",
        verb: "GET"
      },
      isStatic: true
    });

    model.getDerivedInfo = function (fieldData, options, cb) {
      var self = this;
      var connector = self.app.datasources["ft"].connector;
      var modelNamel = self.modelName;
      var fbo_type = self.settings.fbo_type || modelNamel;

      if (connector) {
        var obj = {
          method_name: "getDerivedInfo",
          fbo_type: fbo_type,
          data: fieldData
        };

        connector.transieve(JSON.stringify(obj), function (err, data) {
          if (err) {
            return cb(err, null);
          }
          if (data) {
            try {
              var ret = JSON.parse(data);
            } catch (e) {
              var err = new Error('internal parse error');
              return cb(err, null);
            }
            cb(null, ret);
          } else {
            cb(null, null);
          }
        });
      }
    }

    model.remoteMethod("getDerivedInfo", {
      accepts: [{
        arg: 'fieldData',
        type: 'object',
        http: {
          source: 'body'
        }
      }],
      returns: [{
        arg: 'fbo',
        type: 'object',
        root: true
      }],
      http: {
        path: '/getderivedinfo',
        verb: 'POST'
      },
      isStatic: true
    });
  };
};