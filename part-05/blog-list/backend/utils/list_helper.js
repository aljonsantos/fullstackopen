const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  
  const result = blogs.reduce((max, blog) => {
    return blog.likes > max.likes 
      ? blog
      : max
  })

  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
}

const findAuthorWithMost = (blogs, prop, callback) => {
  const xPerAuthor = blogs.reduce((result, blog) => {
    result[blog.author] 
      ? result[blog.author] += callback(blog)
      : result[blog.author] = callback(blog)
    return result;
  }, {})

  const authorWithMostProp = Object.keys(xPerAuthor).reduce((max, author) => {
    return xPerAuthor[author] > xPerAuthor[max] ? author : max
  })

  return {
    author: authorWithMostProp,
    [prop]: xPerAuthor[authorWithMostProp]
  }
}

const mostBlogs = (blogs) => {
  return findAuthorWithMost(blogs, 'blogs', () => 1)
}

const mostLikes = (blogs) => {
  return findAuthorWithMost(blogs, 'likes', (blog) => blog.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}