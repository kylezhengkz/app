const Post = require("../models/Post")

exports.getAllPosts = async(req, res, next) => {
  console.log(`Display all posts`)
  try {
    const posts = await Post.findAll()
    res.render("display_posts", { posts: posts })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.renderNewPostScreen = async(req, res, next) => {
  console.log(`Render new post screen`)
  try {
    res.render("create_post")
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.createNewPost = async(req, res, next) => {
  let { title, body } = req.body
  console.log(`Create post with title: "${title}" and body: "${body}"`)
  let post = new Post(title, body)
  try {
    await post.save()
    res.redirect('/posts')
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.deletePost = async(req, res, next) => {
  console.log(`Delete post with id: ${req.body.id}`)
  try {
    await Post.delete(req.body.id)
    res.redirect('/posts')
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.getPostById = async(req, res, next) => {
  let postId = req.params.id
  console.log(`Get post with id: ${postId}`)
  try {
    const [post, _] = await Post.findById(postId)
    res.status(200).json({post})
  } catch (err) {
    console.log(err)
    next(err)
  }
}
