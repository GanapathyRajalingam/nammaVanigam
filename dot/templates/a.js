

var it = {
    model:'Department', 
    plural:'departments', 
    fields:{
        'name' : {type : 'String'}, 
        'description' : {type:'String'}, 
        'amount':{type:'Number'}
      }
};

var out='<html><body><div>Model is '+(it.model )+' </div>Fields are '+(Object.keys(it.fields).length); 
function children(fields) { out+=' '+( Object.keys(fields).length ); }  children(it.fields); out+='<div>And end</div></body></html>';



console.log(out);




