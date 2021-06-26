import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { appStore, auth, db } from '../../firebase/firebase';
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
    if (value === '<p><br></p>' || value === '') return false;
    return true;
  };

  const handleUpload = () => {
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
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    );
  };
  return (
    <div>
      {file && (
        <img src={file} height="100px" className="img-thumbnail" alt="" />
      )}
      <ReactQuill value={value} onChange={setValue} />
      <div className="mt-3">
        <input type="file" onChange={handleChange} className="form-control" />
      </div>
      <button
        className="btn btn-outline-primary btn-block mt-3"
        disabled={!verify()}
        onClick={handleUpload}
      >
        Ask Now
      </button>
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

//   componentDidMount() {
//     ref
//       .child('images/WhatsApp Image 2021-04-18 at 1.49.03 PM.jpeg')
//       .getDownloadURL()
//       .then((url) => {
//         this.setState({ file: url });
//         console.log(url);
//       });
//   }

// ref.child('images/')
// const rref = ref
//   .child('images/mountains.jpg')
//   .getDownloadURL()
//   .then((res) => {
//     console.log(res);
//   });
