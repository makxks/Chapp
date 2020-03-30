var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.patch('/add', function (req, res, next) {
  User.findOne({
    "email": req.query.email
  }, function(err, self){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    User.findOne({
      "email": req.body.email
    }, function(err, newContact){
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      self.contacts.push(newContact);
      self.save(function(err, result) {
        if(err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }
      })
      newContact.contacts.push(self);
      newContact.save(function(err, result) {
        if(err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }
        res.status(200).json({
          message: 'Added contact',
          obj: result
        })
      })
    })
  });
});

router.patch('/remove/:deletecontactemail', function (req, res, next) {
  User.findOne({
    "email": req.query.email
  }, function(err, self){
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    User.findOne({
      "email": req.params.deletecontactemail
    }, function(err, deleteContact){
      if(err){
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      self.update(
        { _id: chat._id },
        { $pull: { 'contacts': { email: req.params.deletecontactemail } } }
      )
      deleteContact.update(
        { _id: user._id },
        { $pull: { 'contacts': { email: req.query.email } } }
      )
    })
  });
});

router.get('/', function(res, req, next){
  User.findOne({
    "email": req.query.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    User.find({
      "contacts": { "$in" : [user]}
    }, function(err, contacts){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
      res.status(200).json({
        message: "Success",
        obj: contacts
      })
    })
  })
});

router.get('/singleContact/:id', function(res, req, next){
  User.findOne({
    "email": req.params.email
  }, function(err, user){
    if(err){
      return res.status(500).json({
        title: "An error occurred",
        error: err
      })
    }
    User.findOne({
      _id: req.query.id
    }, function(err, contact){
      if(err){
        return res.status(500).json({
          title: "An error occurred",
          error: err
        })
      }
      res.status(200).json({
        message: "Success",
        obj: contact
      })
    })
  })
});

module.exports = router;
