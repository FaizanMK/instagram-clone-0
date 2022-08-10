import { Button } from '@mui/material';
import React, { useState } from 'react';
import firebase from 'firebase';
import {db,storage} from './firebase';


function ImageUpload({username}) {
 const [image, setImage]=useState(null);
//  const [url, setUrl]=useState();
 const [progress, setProgress]=useState(0);
 const [caption, setCaption]=useState('');
 
const handleChange= (e) => {
    //when we click a file it fires off handleChange method...by this code we get the first file that you have selected b/c sometimes u select multiple files...ku 2 files mu select kal pa ghalti nu aghe ke b dy 1st file select kee and then line 14 says setImage in state to that
    if(e.target.files[0]){
    setImage(e.target.files[0])
}

}


const handleUpload= () => {

const uploadTask= storage.ref(`images/${image.name}`).put(image);

uploadTask.on (
    "state_chagned",
    (snapshot) => {
        //progress function
        const progress= Math.round (
            (snapshot.bytesTransferred / snapshot.totalBytes) *100
        );

        setProgress(progress);
    },
    (error) => {
        //error function
        console.log(error);
        alert(error.message);
    },

    () => {
        //complete function
        storage
        .ref ("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
            //post image inside db
            db.collection("posts").add({

                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
        })
    }

)

}

    return (
    <div>
        <progress value={progress} max="100"/>
        <input type="text" placeholder='Enter a caption...' onChange={(event) =>setCaption(event.target.value) } value={caption} /> 
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}> Upload </Button>

    </div>
  )
}

export default ImageUpload 