import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Sub componntes
import UserList from './UserList';

// Archivo de constantes
import { env } from '../../../utils/constants';

class User extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      users: []
    };

    this.loadUsers = this.loadUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  // Se ejecuta después del primer render
  componentWillMount() {
    this.loadUsers();
  }

  // Obtener usuarios mediante el servicio rest
  loadUsers(){
    const {endPoint, userList} = env.api;
    const path = `${endPoint}${userList}`;

    fetch(path)
      .then(response => response.json())
      .then(users => {
        this.setState({users});
      })
      .catch(console.log);
  }

  // Elimina un usuario mediante el servicio rest
  deleteUser(id){
    const { endPoint, userDelete } = env.api;

    fetch(`${endPoint}${userDelete}/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(result => {
        // Actualizando la lista de usuarios
        this.loadUsers();
      })
      .catch(console.log);
  }

  // Show view
  render() {
    const {root, add} = env.path.user;

    return (
      <div>
        <h2 className="m-4">List Users</h2>
        <Link to={`${root}${add}`}>
          <button className="btn btn-primary mb-4">
            Register User
          </button>
        </Link>
        <UserList users={this.state.users} deleteUser={this.deleteUser}/>
      </div>
    );
  }
}

export default User;
