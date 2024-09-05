/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {
  let books = []

  app.route('/api/books')
    .get(function (req, res){
      return res.json(books);
    })
    
    .post(function (req, res){
      let title = req.body.title;
      let _id = createRandomId(10);
      let respond;
      if (! title) {
        respond = "missing required field title";
      } else {
        respond = {title, _id, comments: [], commentcount: 0};
        books.push(respond);
      }
      return res.json(respond);
    })
    
    .delete(function(req, res){
      books = [];
      return res.json('complete delete successful')
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      let book = books.find(el => el._id === bookid);
      if (! book) return res.json('no book exists')
      return res.json(book)
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      let bookIndex = books.findIndex(el => el._id === bookid);
      let respond;

      if (! comment) respond = 'missing required field comment'
      else if (bookIndex < 0) respond = 'no book exists'
      else {
        books[bookIndex].comments.push(comment)
        respond = books[bookIndex];
      }
      return res.json(respond)

    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      let bookIndex = books.findIndex(el => el._id === bookid);
      let respond;
      if (bookIndex < 0) respond = 'no book exists';
      else {
        books.splice(bookIndex, 1);
        respond = 'delete successful'
      }
      return res.json(respond)
    });

    function createRandomId(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
  
};
