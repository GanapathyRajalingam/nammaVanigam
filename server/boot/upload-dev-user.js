var path = require('path');
var loopback = require('loopback');

module.exports = function(app) {

    var User = loopback.getModelByType('BaseUser');
    var AccessToken = loopback.getModelByType('AccessToken');
    var uuid = require("uuid");
    var query = {where : {username:'ftdev'}};
    var options = {
        fetchAllScopes : true,
        tenantId : "default",
        ignoreAutoScope: true,
        bootContext: true,
        ctx: {
            tenantId : "default",
            remoteUser: "system"
        }
    };

    function createToken(user, options) {
        var q1 = { where : {id : 'ftdev'}};
        var token1 = {
            id : 'ftdev',
            tenantId : "default",
            roles : [ 
                "ftdev", "admin"
            ],
            username : user.username,
            userTenantId : "default",
            ttl : 1209600,
            userId : user.id
        }
        AccessToken.findOrCreate(q1, token1, options, function(err, rec) {
            console.log('token created ', rec.id);
        });
    }

    User.findOne(query, options, function (err, user) {
        if (err) {
            return;
        }
        if (user) {
            createToken(user, options);
        }
        else {
            var userData  = {"username" : "ftdev", "email" : "ftdev", "tenantId" : "default"};
            userData.pwd = uuid.v4(); // for dev we want to know user pwd
            userData.password = userData.pwd;
            userData.tenantId = 'default';
            console.log(userData, options);
            User.create(userData, options, function(err, user) {
                if (user) {
                    createToken(user, options);
                }
            });
        }
    });
};
