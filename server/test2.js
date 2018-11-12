var obj = {
  _start_date: "01-Jan-2011"
};

Object.defineProperty(obj, "start_date", {
  enumerable: false,
  set: function(x) {
    console.log("setter");
    this._start_date = x;
  },
  get: function() {
    console.log("getter");
    return this._start_date;
  }
});

obj.start_date = "02-jan-2011";

console.log("obj sd is ", obj.start_date);
//console.log("obj keys ", Object.keys(obj));
console.log("obj is ", JSON.stringify(obj));
