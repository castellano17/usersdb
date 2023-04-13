const Users = require('../models/users.models')
const uuid = require('uuid')
const {hashPassword} = require('../utils/crypto')


const findUserByEmail = async (email) =>{
  const data = await Users.findOne({
    where: {
      email: email
    }
  })
  return data
}


const createNewUser = async(userObj)=>{
  const newUser = {
    id: uuid.v4(),
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    password: hashPassword(userObj.password),
    birthday: userObj.birthday,
    phone: userObj.phone
  };

  const data = await Users.create(newUser)
  return data
}

const findAllUsers = async ()=>{
  const users = await Users.findAll()
  return users
}

const findUserById = async (id) => {
  const data = await Users.findOne({
    where: {
      id: id,
    },
  });
  return data;
};

const updateUser = async (id, userObj) => {
  const userSelected = await Users.findOne({
    where: {
      id: id,
    },
  });
  if (!userSelected) return null;
  const modifiedUser = await userSelected.update(userObj);

  // const user = await Users.update(userObj, {
  //   where: {
  //     id: id,
  //   },
  // });
  return modifiedUser;
};

const deleteUser = async (id) => {
  const user = await Users.destroy({
    where: {
      id: id,
    },
  });
  return user;
};


module.exports={
  createNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  findUserByEmail
}