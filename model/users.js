const { response } = require('../app');
const User = require('./schemas/users');

const createUser = async (obj) => {
  const user = new User({
    name: obj.name,
    surname: obj.surname,
    number: obj.number,
    email: obj.email,
    info: obj.info,
  });
  try {
    await user.save();
  } catch (err) {
    console.log('Error>>>', err)
  }
};

const getUserById = async (id) => {
  const user = await User.find({_id: id});
  return user[0];
}

const getAllUsers = async (ress) => {
  await User.find({}, function(err, users){
    ress.render('index', {
      usersList: users
    })
  });
};

const updateUserById = async (data) => {
  await User.findOneAndUpdate(
    {_id: data.id},
    {
      name: data.name,
      surname: data.surname,
      number: data.number,
      email: data.email,
      imfo: data.info,
    })
}


module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
}