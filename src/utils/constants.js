export const env = {
  api: {
    endPoint: 'https://node-express-2018.herokuapp.com/api',
    userList: '/users',
    userRegister: '/save/user',
    userDetail: '/user',
    userUpdate: '/update/user',
    userDelete: '/delete/user'
  },
  path: {
    root: '/',
    user: {
      root: '/user',
      add: '/add',
      detail: '/detail',
      update: '/udpate',
      delete: '/delete'
    }
  },
  form: {
    user: {
      photo: 'https://gravatar.com/avatar/d4a175d5894d60b5e46ca4d472d69a30?s=400&d=robohash&r=x'
    }
  }
};
