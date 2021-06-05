import React from 'react'
import LoginForm from '../components/LoginForm';
import UserForm from '../components/UserForm';

export default function Landing() {
    return (
        <React.Fragment>
            <div className="col-md-6 text-side">
              <h1>Go to admin page</h1>
              <LoginForm />
            </div>
            <div className="col-md-6 form-side">
              <h1>Register your details</h1>
              <UserForm />
            </div>
        </React.Fragment>
    )
}
