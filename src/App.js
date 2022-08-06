import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase';

function App() {
 const [posts,setPosts]=useState([]);

 useEffect(() => {

  db.collection('posts').onSnapshot(snapshot => {

    setPosts(snapshot.docs.map(doc => doc.data()))
  })

 },[] )

 
  return (
    <div className="app">
     

      <div className="app__header">

      <img className="app__headerImage" 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="" />
      </div>

      <h1>Hello Clever programmer, Let's build an instagram clone with react</h1>
      {
        posts.map(post => (
        //  return <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} /> che kala
        // () na use kao {} da kao nu bya b return statement wrkao b/c map returns something

          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />

        ))
      }

      {/* <Post username='Faizan' caption='wow it works!!' imageUrl="https://reactjs.org/logo-og.png"/>

      <Post username='Huzaifa' caption='wow, Amazon!!' imageUrl="https://i.dawn.com/primary/2021/05/60a7680bee726.png" />
      
      <Post username='Usama' caption='wow, MacBook!!' imageUrl="https://www.xda-developers.com/files/2022/07/apple-macbook-air-m2-first-look-xda-1.jpg"/>
 */}

    </div>
  );
}

export default App;
