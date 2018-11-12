var loopback = require('loopback');

module.exports = function(Order) {

/*     var sources = {
        core : {
            businessUnit : 'B1',
            department : 'D1'
        }
    };
	Order.observe('after save', function (ctx, next) {
		if (ctx.isNewInstance) {
            var GLKey = Order.app.models.GLKey;
            var GLPosting = Order.app.models.GLPosting;
            var transaction = ctx.instance;
            var filter = {
                where : {
                    transactionType : transaction.type,
                    transactionSubType : transaction.subType
                }
            };
            GLKey.find(filter, ctx.options, function(err, glkeys){
                glkeys.forEach(function(key) {
                    var data = {
                        account : transaction.data.accountId,
                        amount : transaction.data.amount
                    };
                    data.businessUnit = transaction.data.businessUnit || sources[transaction.source].businessUnit;
                    data.department = transaction.data.solId || sources[transaction.source].department;
                    data.ledger = key.ledger;
                    GLPosting.create(data, ctx.options, function(err, dbrec){
                        console.log(dbrec);
                    });
                });
            });
		} 
		next();
	}); */

};
