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
 * Implemention of Counterparty Model 
 * @author kpraveen
 */

var path = require('path');
var fs = require('fs');

module.exports = function(Data) {
  /**
     * REST endpoint for completing Counterparty related features
     * @param  {Object}   name              Name
     * @param  {Object}   options           Options
     * @param  {Function} next              Callback
     */

  /* Below logic of forming request and calling limoclient can also be moved to loopback 
     ft connector so that this <model>.js file is loosely coupled with connector specific 
     logic */

  Data.fetch = function(name, options, done) {
    var fname = path.resolve('./client/data/' + name.toLowerCase() + ".json");
    fs.readFile(fname, function(err, fdata){
        if (err) {
            return done(err);
        }
        var data = JSON.parse(fdata);
        done(null, data);
    });
  };

  Data.remoteMethod("fetch", {
    accessType: "READ",
    accepts: [
      {
        arg: "name",
        type: "string",
        required: true,
        http: { source: "path" }
      }
    ],
    returns: { type: "object", root: true },
    description: ["return combo values"],
    http: { path: "/:name", verb: "GET" },
    isStatic: true
  });
};
