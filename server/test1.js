var ftmodel = require('../common/ftmodel/nostro.json');
console.log(ftmodel);

 
var model = {
    name : "Nostro",
    base : "BaseFBO",
    options: {
        fbo_type: ftmodel.fbo_type,
        oracle: {
            table: ftmodel.table_name
        }
    },
    properties : {

    }
};

var typemap = {
    IQString : 'String',
    IQDecimal : 'Number',
    IQRate : 'Number',
    IQDate : 'Date',
    IQPrice : 'Number',
    IQBoolean : 'Boolean'
};

var keys = Object.keys(ftmodel.properties);
keys.forEach(function(key){
    var meta = ftmodel.properties[key];
    var prop = {};
    prop.required = meta.required;
    prop.type = typemap[meta.type] ? typemap[meta.type] : 'String';
    model.properties[key] = prop;
});

//console.log(JSON.stringify(model));





