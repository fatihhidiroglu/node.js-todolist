var mysql = require('mysql');

//Bağlantıları tek tek oluşturmak ve yönetmek yerine, 
//createpool aynı zamanda yerleşik bağlantı havuzu oluşturma özelliğini kullanır.

function Connection() {
  this.pool = null;

  var bag = {
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'todos-list'
  };

  this.init = function () {
    this.pool = mysql.createPool(bag);
  };

  this.acquire = function (callback) {
    this.init();
    this.pool.getConnection(function (err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();