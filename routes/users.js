const express = require('express');
const multer  = require('multer');
const router = express.Router();
const upload = multer();
const { createUser, getUserById, getAllUsers, updateUserByid } = require('../model/users');


/* GET users listing. */
router.get('/:id', async(req, res) => {
  const user = await getUserById(req.params.id);
  res.render('index', {user: user})
});

router.post('/', upload.none(), async (req, res) => {
  await updateUserByid(req.body)
});

module.exports = router;
