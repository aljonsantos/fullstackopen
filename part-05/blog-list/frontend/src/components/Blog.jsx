import { useState } from 'react'

const Blog = ({ blog, handleBlogLike, handleDeleteBlog }) => {
  const [expand, setExpand] = useState(false)
  
  const userOwnsBlog = blog.user.username === JSON.parse(window.localStorage.getItem('user')).username

  return (
    <div className="blog" style={{ border: '1px solid lightgray', padding: '5px 0'}}>
      <span>{blog.title} - <i>{blog.author}</i></span> 
      <button onClick={() => setExpand(!expand)}>{expand ? 'hide' : 'view'}</button>
      {userOwnsBlog && <button onClick={() => handleDeleteBlog(blog.id)}>delete</button>}
      
      {expand && 
        <div>
          {blog.url}<br />
          likes {blog.likes} <button onClick={() => handleBlogLike(blog.id)}>like</button><br />
          {blog.user.name}<br />
        </div>
      }
    </div>
  )
}

export default Blog