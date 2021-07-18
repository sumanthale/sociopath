import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { appStore, auth, db } from '../../firebase/firebase';
import striptags from 'striptags';
function PostQuestion() {
  const [value, setValue] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]));
  };
  const verify = () => {
    if (striptags(value).trim().length <= 0) return false;
    return true;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file && image) {
      uploadWithImage();
    } else {
      uploadWithOutImage();
    }
  };

  const uploadWithImage = () => {
    const name = image.name + new Date().toISOString();
    const uploadTask = appStore.ref(`images/${name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log(snapshot);
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
            db.collection('posts')
              .add({
                image: url,
                likes: [],
                text: value,
                time: new Date(),
                user: auth.currentUser.email,
                userName: auth.currentUser.email.split('@')[0],
              })
              .then((snap) => {
                console.log(snap);
                setFile(null);
                setValue('');
                setImage(null);
                setProgress(0);
                document.getElementById('ask-file').value = '';
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    );
  };
  const uploadWithOutImage = () => {
    db.collection('posts')
      .add({
        likes: [],
        text: value,
        time: new Date(),
        user: auth.currentUser.email,
        userName: auth.currentUser.email.split('@')[0],
      })
      .then((snap) => {
        console.log(snap);
        setValue('');
        document.getElementById('ask-file').value = '';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {file && (
        <img src={file} height="100px" className="img-thumbnail" alt="" />
      )}
      <ReactQuill value={value} onChange={setValue} />

      <form onSubmit={handleUpload} className="d-flex">
        <div className="mt-3 mr-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              onChange={handleChange}
              id="ask-file"
            />
            <label className="custom-file-label" htmlFor="ask-file">
              Choose file
            </label>
          </div>
        </div>
        <button
          className="btn btn-outline-dark btn-block mt-3"
          disabled={!verify()}
          type="submit"
        >
          Ask Now
        </button>
      </form>

      {progress > 0 && (
        <div className="progress mt-2" style={{ height: '.5rem' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: progress + '%' }}
          ></div>
        </div>
      )}
    </div>
  );
}
export default PostQuestion;
