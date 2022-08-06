import React from 'react'
import './Post.css'
import Avatar from '@mui/material/Avatar';

function Post() {
  return (
    <div className='post'>
    
    
    <div className="post__header">
    <Avatar className='post__avatar'
     alt="Faizan MK" 
     src="/static/images/avatar/1.jpg"
      />

        <h3>username</h3>
        </div>

        {/* header ---->avatar + username */}


        <img className='post__image' src="https://reactjs.org/logo-og.png" alt="" />
        {/* image */}

        <h4 className='post__text'> <strong>Faizan</strong> keep going</h4> 
        {/* username+caption */}


    </div>
  )
}

export default Post