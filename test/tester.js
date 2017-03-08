//const Extensions = require("../utils/extensions.js");
//Extensions.init(web3,assert);

// Found here https://gist.github.com/xavierlepretre/88682e871f4ad07be4534ae560692ee6
web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
  var transactionReceiptAsync;
  interval = interval ? interval : 500;
  transactionReceiptAsync = function(txnHash, resolve, reject) {
    try {
      var receipt = web3.eth.getTransactionReceipt(txnHash);
      if (receipt == null) {
        setTimeout(function () {
          transactionReceiptAsync(txnHash, resolve, reject);
        }, interval);
      } else {
        resolve(receipt);
      }
    } catch(e) {
      reject(e);
    }
  };

    return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txnHash, resolve, reject);
  });
};


contract('A',function(accounts){
    
    it("should increment array by 1", function(){
        var contractA = A.deployed();
        return contractA.getMyArrayLength.call()
        .then(function(length){
          assert.equal(length.valueOf(),0,"empty array to start");
          return contractA.myFunction({from:accounts[0]})
        }).then(function(txn){
            web3.eth.getTransactionReceiptMined(txn)
        }).then(function(receipt){
            return contractA.getMyArrayLength.call()
        }).then(function(len){
            console.log("Array size: "+len);
            assert.equal(len.valueOf(),1,"size equal to 1");
        });
    });
});