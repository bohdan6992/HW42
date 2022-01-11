const express = require('express');
const multer  = require('multer');
const router = express.Router();
const upload = multer();
const User = require('../model/schemas/users');
const { createUser, getUserById, getAllUsers } = require('../model/users');


/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express' });
// });

router.post('/', upload.none(), async (req, res, next) => {
  await createUser(req.body, (err) => {
    if (!err) {
        res.redirect('/');
    }
    else { console.log('Error in user create :' + err); }
  });
});

router.get('/', (req, res) => {
  User.find({}, function(err, users){
    res.render('index', {
      usersList: users
    })
  });
});


router.get('/delete/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/');
      }
      else { console.log('Error in user delete :' + err); }
  });
});

module.exports = router;
