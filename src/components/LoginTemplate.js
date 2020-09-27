import React from 'react';
import './LoginTemplate.css';

const LoginTemplate = ({form, children}) => { //(props)=>
  return (
    <main className="login-template">
      <div className="title">
        LOG IN
      </div>
      <section className="form-wrapper">
        {form}
      </section>
      <section className="todos-wrapper">
        { children }
      </section>
    </main>
  );
};

export default LoginTemplate;