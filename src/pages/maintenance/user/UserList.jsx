import React from 'react';

// Subcomponents
import User from './User';

const UserList = (props) => (
  <div className="row">
    {
      props.users.map((user, i) => (
        <User
          index={i + 1}
          key={user._id}
          _id={user._id}
          name={user.name}
          email={user.email}
          photo={user.photo}
          deleteUser={props.deleteUser}
        />
      ))
    }
  </div>
);

export default UserList;
