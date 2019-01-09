import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Constantes 
import {env} from '../../../utils/constants';
import {isURL} from '../../../utils/validations';

class UserForm extends Component {
  constructor(...props) {
    super(...props);

    this.handleChangePhoto = this.handleChangePhoto.bind(this);

    this.saveUser = this.saveUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.formToJson = this.formToJson.bind(this);

    this.registerUser = this.registerUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  // Método cuando el contenido del input de la foto cambia
  handleChangePhoto(e) {
    const url = e.target.value;

    if (isURL(url))
      document.getElementById('user-profile-photo').setAttribute('src', url);
    else if (url.trim() === '')
      document.getElementById('user-profile-photo').setAttribute('src', env.form.user.photo);
  }

  //
  saveUser(e) {
    e.preventDefault();
    const {url} = this.props.match;
    const {add, update} = env.path.user;

    if (url.includes(add))
      this.registerUser(e);
    else if (url.includes(update))
      this.updateUser(e);
  }

  // Registran un usuario mendiante ek servicio rest
  registerUser(e) {
    const {endPoint, userRegister} = env.api;
    const user = this.formToJson(e.target);
    let success = false;

    user.photo = isURL(user.photo) ? user.photo : env.form.user.photo;

    fetch(`${endPoint}${userRegister}/${user.id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
      .then(response => {
        if (response.ok)
          success = true;

        return response.json();
      })
      .then(result => {
        if (success) {
          this.props.history.push(env.path.user.root);
        } else {
          console.log('ERROR_RESPONSE', result.message);
        }
      })
      .catch(console.log);
  }

  // Actualiza el usuario mediante el servicio rest
  updateUser(e) {
    const {endPoint, userUpdate} = env.api;
    const user = this.formToJson(e.target);
    let success = false;

    fetch(`${endPoint}${userUpdate}/${user.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
      .then(response => {
        if (response.ok)
          success = true;

        return response.json();
      })
      .then(result => {
        if (success) {
          this.props.history.push(env.path.user.root);
        } else {
          console.log('ERROR_RESPONSE', result.message);
        }
      })
      .catch(console.log);
  }

  // Obtiene los datos del formulario y los retorna en objeto
  formToJson(form) {
    const user = {};

    [...form.getElementsByTagName('input')].forEach(input => {
      Object.assign(user, {
        [input.getAttribute('id').replace('user-', '')]: input.value
      });
    });

    return user;
  }

  // Se ejecuta después del primer render
  componentDidMount() {
    this.getUser();
  }

  // Obtiene el usuario desde el servicio rest
  getUser() {
    const {url, params} = this.props.match;
    const {endPoint, userDetail} = env.api;
    const {add, detail, update} = env.path.user;
    const form = document.getElementById('form-user');

    // Modificando el formulario
    if (url.includes(add)) {
      // Modificando el título del formulario
      form.querySelector('legend').textContent = 'Register user';

      // Mostrando el botón de registro
      const btn = document.getElementById('btn-save-user');

      btn.classList.remove('d-none');
      btn.textContent = 'Register';
    } else {
      if (url.includes(update)) {
        // Modificando el título del formulario
        form.querySelector('legend').textContent = 'Update user';

        // Mostrando el botón de registro
        const btn = document.getElementById('btn-save-user');

        btn.classList.remove('d-none');
        btn.textContent = 'Update';
      } else if (url.includes(detail)) {
        // Modificando el título del formulario
        form.querySelector('legend').textContent = 'Detail user';

        // Deshabilitando los inputs del formulario
        [...form.getElementsByTagName('input')].forEach(input => {
          input.readOnly = true;
        });
      }

      // Cargando datos del usuario
      fetch(`${endPoint}${userDetail}/${params.id}`)
        .then(response => response.json())
        .then(user => {
          // Mostrando datos del usuario
          form['user-id'].value = user._id;
          form['user-name'].value = user.name;
          form['user-email'].value = user.email;
          form['user-photo'].value = user.photo;
          form.querySelector('#user-profile-photo').setAttribute('src', user.photo);
        })
        .catch(console.log);
    }
  }

  // Mostrar la vista
  render() {
    const {photo} = env.form.user;
    const {root} = env.path.user;

    return (
      <div>
        <form onSubmit={this.saveUser} id="form-user">
          <fieldset>
            <legend className="h2 m-4"></legend>
            <input type="hidden" id="user-id"/>

            <div className="row">
              <div className="col-sm-6 col-lg-8">
                <div className="form-group">
                  <label htmlFor="user-name">Name</label>
                  <input className="form-control" placeholder="Name" id="user-name" autoFocus/>
                </div>
                <div className="form-group">
                  <label htmlFor="user-email">Email</label>
                  <input type="email" className="form-control" placeholder="Email" id="user-email"/>
                </div>
                <div className="form-group">
                  <label htmlFor="user-photo">Photo</label>
                  <input type="url" className="form-control" placeholder="Photo" id="user-photo"
                         onChange={this.handleChangePhoto}/>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <img src={photo} className="img-fluid img-thumbnail rounded" id="user-profile-photo" alt="User-profile"/>
              </div>

              <div className="col-sm-6 col-lg-8">
                <div className="form-group mt-4">
                  <Link to={root}>
                    <button className="btn btn-primary">Show users</button>
                  </Link>
                  &nbsp;
                  <button type="submit" className="btn btn-success d-none" id="btn-save-user">Register</button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default UserForm;
