var connection = require('./connection');

function Todo() {
  this.getUsers = function (res) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM users', function (err, result) {//kullanıcı çekme işlemi
        con.release();
        res.send(result);
        console.log("Tüm kullanıcılar listelendi.");
      });
    });
  };

  this.getTodos = function (res) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM todos', function (err, result) {//todoları listeleme
        con.release();
        res.send(result);
        console.log("Tüm todolar listelendi.");
      });
    });
  };

  this.getUserTodosByID = function (id, res) {
    connection.acquire(function (err, con) {
      con.query('SELECT * FROM todos WHERE kid = ?', id, function (err, result) {//kullanıcıların todolarını cekme
        con.release();
        res.send(result);
        console.log('istenilen kullanıcının todoları listelendi.');
      });
    });
  };

  this.create = function (todo, res) {


    connection.acquire(function (err, con) {
      con.query('INSERT INTO todos SET ?', todo, function (err, result) {//veri ekleme 
        con.release();
        if (err) { 
          res.send({ status: 1, message: 'TODO eklenemedi.' + err });
        } else {
          res.send({ status: 0, message: 'TODO eklendi.' });
          console.log("Post işlemi başarıyla tamamlandı.");
        }
      });
    });
  };

  this.update = function (todo, id, res) {
    connection.acquire(function (err, con) {
      console.log(todo);
      con.query('UPDATE todos SET ? WHERE id = ?', [todo, id], function (err, result) {//seçilen veriyi güncelleme
        con.release();
        //console.log(result);
        if (err) {
          res.send({ status: 1, message: 'TODO güncellenemedi.' });
        } else {
          res.send({ status: 0, message: 'TODO güncellendi.' });
          console.log("Put işlemi başarıyla çalıştı.");
        }
      });
    });
  };

  this.delete = function (id, res) {
    connection.acquire(function (err, con) {
      con.query('DELETE FROM todos WHERE id = ?', id, function (err, result) {//seçilen veriyi silme
        con.release();
        if (err) {
          res.send({ status: 1, message: 'TODO silinemedi.' });
        } else {
          res.send({ status: 0, message: 'TODO silindi.' });
          console.log("Delete işlemi başarıyla çalıştı.");
        }
      });
    });
  };
};

module.exports = new Todo();