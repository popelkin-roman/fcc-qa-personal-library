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
        respond = {title, _id, commentcount: 0};
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
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
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
