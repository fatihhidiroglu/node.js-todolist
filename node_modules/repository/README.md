# Repository

Repository base class for Node.JS.  Currently only supports MySQL.

## Creating a Repository

```javascript

var PersonRepository = Repository.extend({
  getAll: function (limit) {
    return this.query('select * from person limit ?', [ limit ]);
  },

  get: function (id) {
    return this.query('select * from person where id = ?', [ id ]);
  }
});

var mysql = require('mysql')
  , connection = mysql.createConnection(require('./settings'))
  , personRepository = new PersonRepository(connection);

personRepository.getAll().then(function (person) {
  console.log(person);
}, function (err) {
  console.log('getAll error', err);
});

```

