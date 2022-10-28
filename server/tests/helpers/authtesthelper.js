import User from '../../models/user.js';

const initialUsers = [
  {
    username: 'aaaaa',
    password: 'aaaaa',
  },
  {
    username: 'bbbbb',
    password: 'bbbbb',
  },
  {
    username: 'ccccc',
    password: 'ccccc',
  },
  {
    username: 'ddddd',
    password: 'ddddd',
  },
  {
    username: 'eeeee',
    password: 'eeeee',
  },
];

const wrongUsers = [
    {
        username: 'aa',
        password: 'aaaaa',
      },
      {
        username: 'fdsfdsaf',
        password: 'bbbbb',
      },
      {
        username: 'ccccc',
        password: 'ccdsfdsfsadf',
      },
]

const userInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export { initialUsers, wrongUsers, userInDb };
