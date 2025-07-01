const bcrypt = require('bcryptjs');

const users = [
  {
    id: 'u1',
    firstName: 'Olaf',
    secondName: 'Grzesiak',
    login: 'admin',
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  },
  {
    id: 'u2',
    firstName: 'Anna',
    secondName: 'Nowak',
    login: 'devops',
    passwordHash: bcrypt.hashSync('devops123', 10),
    role: 'devops'
  },
  {
    id: 'u3',
    firstName: 'Jan',
    secondName: 'Kowalski',
    login: 'developer',
    passwordHash: bcrypt.hashSync('dev123', 10),
    role: 'developer'
  }
];

function getUserByLogin(login) {
  return users.find(user => user.login === login);
}

function getUserById(id) {
  const { passwordHash, ...userData } = users.find(user => user.id === id) || {};
  return userData;
}

module.exports = { getUserByLogin, getUserById };
