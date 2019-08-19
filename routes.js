var todo = require('./todo');

module.exports = {
  configure: function (app) {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.get('/kullanici', function (req, res) {//kullanıcıları getırıyor
      todo.getUsers(res);
    });

    app.get('/todo', function (req, res) {//tum todoları getıırıyor
      todo.getTodos(res);
    }); 

    app.get('/kullanici/:id', function (req, res) {//secılen kullanıcının todolarını getırıyor
      todo.getUserTodosByID(req.params.id, res);
    });

    app.post('/todo', function (req, res) {//kullanıcıya todo eklıyor
      todo.create(req.body, res);
    });

    app.put('/todo/:id', function (req, res) {//kullanıcının ekle-id sıne gore todosunu guncellıyor
      todo.update(req.body, req.params.id, res);
    });

    app.delete('/todo/:id', function (req, res) {//kullanıcının ekle-id sıne gore todosunu sılıyor
      todo.delete(req.params.id, res);
    });
  }
};