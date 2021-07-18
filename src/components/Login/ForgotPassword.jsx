import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const [mail, setMail] = useState('');
  const [error, setError] = useState(null);
  const handelSubmit = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(mail)
      .then(function () {
        setSent(true);
      })
      .catch(function (error) {
        setError(error.message);
      });
  };
  useEffect(() => {
    setError(null);
    setSent(false);
  }, [mail]);
  useEffect(() => {
    return () => {
      setSent(false);
      setError(null);
      setMail('');
    };
  }, []);

  return (
    <div
      className="container d-flex flex-column justify-content-center"
      style={{
        height: '100vh',
      }}
    >
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="alert alert-info p-5">
        <form onSubmit={handelSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              className="form-control d-block"
              id="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <button className="btn btn-primary btn-block" type="submit">
                Reset
              </button>
            </div>
            <div className="col-md-6">
              <Link className="btn btn-dark btn-block" to="/login">
                Go Back
              </Link>
            </div>
          </div>
        </form>
      </div>
      {sent && (
        <div className="alert alert-success">
          Open mail and reset Your password
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
