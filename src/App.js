import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {auth, db} from './firebase';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
 
  const [posts, setPosts]=useState([]);
  const[open,setOpen]=useState(false);
  const [openSignIn, setOpenSignin]=useState(false);
  const[username,setUsername]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const [user, setUser]=useState(null);

useEffect( () => {

const unsubscribe= auth.onAuthStateChanged((authUser) => {
if (authUser){
// User is signed in
console.log(authUser);
setUser(authUser);



} else {
// User is signed out
setUser(null);
}


})

return () => {
  //perform some cleanup actions
  unsubscribe();

}

}, [user,username]);


 useEffect(() => {

  db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {

    setPosts(snapshot.docs.map(doc => ({
      
      id: doc.id,
      post: doc.data()})))
  })

 },[] )

 const signUp=(event)=> {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error)=> alert(error.message))
  
    setOpen(false);
 }

 const signIn=(event)=>{
  event.preventDefault();

  auth.signInWithEmailAndPassword(email, password)
  .catch((error) => {
  alert(error.message);
  })
  setOpenSignin(false);
 }
 
  return (
    <div className="app">

      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">

            <form  className="app__signup">
            <center>
            <img className="app__headerImage" 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="" />

            </center>

          <TextField
           placeholder="username"
           type="text"
           email={username}
           onChange={(e)=>setUsername(e.target.value)}
           >
          </TextField>

          <TextField
           placeholder="email"
           type="text"
           email={email}
           onChange={(e)=>setEmail(e.target.value)}
           >
          </TextField>

          <TextField
           placeholder="password"
           type="password"
           email={password}
           onChange={(e)=>setPassword(e.target.value)}
           >
          </TextField> 


          <Button type="submit" onClick={signUp} >Sign Up</Button>

          </form>
            
          </Typography>
          
        </Box>
       
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignin(false)}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">

            <form  className="app__signup">
            <center>
            <img className="app__headerImage" 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="" />

            </center>

          <TextField
           placeholder="email"
           type="text"
           email={email}
           onChange={(e)=>setEmail(e.target.value)}
           >
          </TextField>

          <TextField
           placeholder="password"
           type="password"
           email={password}
           onChange={(e)=>setPassword(e.target.value)}
           >
          </TextField> 


          <Button type="submit" onClick={signIn} >Sign In</Button>

          </form>
            
          </Typography>
          
        </Box>
       
      </Modal>




      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      
      { user? (
          <Button onClick={()=> auth.signOut()}>Logout</Button>

        ): (
          <div className="app__loginContainer">
            <Button onClick={()=> setOpenSignin(true)}> Sign in </Button>
            <Button onClick={()=> setOpen(true)}> Sign Up </Button>

          </div>
          
          )
      }
      </div>
       
      <div className="app__posts">
        <div className="app__postsLeft">
        {
        posts.map(({id,post}) => (
        //  return <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} /> che kala
        // () na use kao {} da kao nu bya b return statement wrkao b/c map returns something

          <Post key={id} postId={id} user={user}  username={post.username} caption={post.caption} imageUrl={post.imageUrl} />

        ))
      }
        </div>
        <div className="app__postsRight">
        <InstagramEmbed
      url='https://www.instagram.com/p/Cg-A5jgMS4Z/?igshid=YmMyMTA2M2Y='
      clientAccessToken='123|456'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
    />
      
        </div>
      
      

      </div>
    

{
        user?.displayName? (
          <ImageUpload username={user.displayName}/>
          
        ) : (
          <h3>Sorry you need to login to upload</h3>
        )
      }

      {/* <Post username='Faizan' caption='wow it works!!' imageUrl="https://reactjs.org/logo-og.png"/>

      <Post username='Huzaifa' caption='wow, Amazon!!' imageUrl="https://i.dawn.com/primary/2021/05/60a7680bee726.png" />
      
      <Post username='Usama' caption='wow, MacBook!!' imageUrl="https://www.xda-developers.com/files/2022/07/apple-macbook-air-m2-first-look-xda-1.jpg"/>
 */}

    </div>
  );
}

export default App;
