import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { appStore, auth, db } from '../../firebase/firebase';

class UserDetailsFrom extends Component {
  state = {
    firstName: '',
    lastName: '',
    userName: auth.currentUser.email.split('@')[0],
    imageUrl: 'http://simpleicon.com/wp-content/uploads/account.png',
    bio: '',
    imageFile: '',
    verifyEmail: false,
    userFromDB: false,
    progress: 0,
    error: null,
  };

  async componentDidMount() {
    db.collection('users')
      .where('userName', '==', this.state.userName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          this.setState({
            ...doc.data(),
            userFromDB: true,
          });
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handelImage = (event) => {
    this.setState({
      imageFile: event.target.files[0],
      imageUrl: URL.createObjectURL(event.target.files[0]),
    });
  };
  handleUpload = (event) => {
    event.preventDefault();
    const { imageFile: image } = this.state;
    const name = image.name + new Date().toISOString();
    const uploadTask = appStore.ref(`images/${name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({
          progress,
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        appStore
          .ref('images')
          .child(name)
          .getDownloadURL()
          .then((url) => {
            db.collection('users')
              .add({
                imageUrl: url,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                bio: this.state.bio,
                user: auth.currentUser.email,
              })
              .then((snap) => {
                console.log('Uploaded done');
                console.log(snap);
                this.setState({ userFromDB: true, progress: 0 });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    );
  };

  render() {
    return (
      <div className="container">
        {!!this.state.error ? (
          <div className="alert alert-danger">{this.state.error.message}</div>
        ) : (
          this.state.userFromDB &&
          !auth.currentUser.emailVerified &&
          (!this.state.verifyEmail ? (
            <div className="alert alert-danger text-center">
              Click to Verify Your Email {auth.currentUser.email} &nbsp; &nbsp;
              <button
                className="btn btn-success"
                onClick={() => {
                  auth.currentUser
                    .sendEmailVerification()
                    .then(() => {
                      this.setState({
                        verifyEmail: true,
                      });
                    })
                    .catch((err) => {
                      this.setState({
                        error: err,
                      });
                    });
                }}
              >
                Verify
              </button>
            </div>
          ) : (
            <div className="alert alert-info text-center">
              Please Check your mail after successful Verification click here!
              &nbsp; &nbsp;
              <button
                className="btn btn-outline-dark"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Verified
              </button>
            </div>
          ))
        )}

        <form onSubmit={this.handleUpload}>
          <div className="preview  text-center ">
            <img
              className="preview-img shadow"
              src={this.state.imageUrl}
              alt="user profile"
              width="200"
              height="200"
            />
            <div className="browse-button">
              <i className="fa fa-pencil-alt"></i>
              <input
                className="browse-input"
                type="file"
                name="UploadedFile"
                id="UploadedFile"
                accept="image/*"
                onChange={this.handelImage}
                required
              />
            </div>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form6Example3">
              User Name
            </label>
            <input
              type="text"
              id="form6Example3"
              className="form-control"
              disabled
              value={this.state.userName}
            />
          </div>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example1">
                  First name
                </label>
                <input
                  type="text"
                  id="form6Example1"
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handelChange}
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example2">
                  Last name
                </label>
                <input
                  type="text"
                  id="form6Example2"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handelChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form6Example7">
              Bio
            </label>
            <textarea
              className="form-control"
              id="form6Example7"
              rows="4"
              name="bio"
              value={this.state.bio}
              onChange={this.handelChange}
            ></textarea>
          </div>
          {!!this.state.progress && (
            <div className="progress mb-3" style={{ height: '10px' }}>
              <div
                className="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                style={{ width: `${this.state.progress}%` }}
              ></div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            disabled={this.state.userFromDB}
          >
            Update Information
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(UserDetailsFrom);
