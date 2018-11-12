module.exports = function(Item) {

  Item.debug = function(name, options, done) {
    Item.create({name:'asdasd'}, options, function(err, rec){
        console.log(err);
        console.log(rec);
        done({'debug':true});
    });
    
  };

  Item.remoteMethod("debug", {
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
    description: ["debug"],
    http: { path: "/debug", verb: "GET" },
    isStatic: true
  });
};