import React from 'react';
import {Link} from 'react-router-dom';

// Constantes
import {env} from '../../../utils/constants';

const User = props => {
  const {root, detail, update} = env.path.user;

  return (
    <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
      <img src={props.photo} alt={props.name} className="img-fluid img-thumbnail rounded"/>
      <p className="text-center h5 text-wrap">
        {props.name}
      </p>
      <p className="text-center text-wrap text-muted">
        {props.email}
      </p>
      <div className="col-12 text-center">
        <Link to={`${root}${detail}/${props._id}`}>
          <button className="btn btn-sm btn-info">Detail</button>
        </Link>
        &nbsp;
        <Link to={`${root}${update}/${props._id}`}>
          <button className="btn btn-sm btn-secondary">Update</button>
        </Link>
        &nbsp;
        <button
          className="btn btn-sm btn-danger"
          onClick={() => props.deleteUser(props._id)}
        >Delete
        </button>
      </div>
    </div>
  );
};

export default User;
