const queryMethods = require('../models/query')

exports.getAllPosts = async(req, res, next) => {
  console.log(`Display all posts`)
  try {
    const posts = await queryMethods.findAll("posts")
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
  try {
    await queryMethods.addPostRecord(title, body)
    res.redirect('/posts')
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.deletePost = async(req, res, next) => {
  console.log(`Delete post with id: ${req.body.id}`)
  try {
    await queryMethods.deleteById("posts", req.body.id)
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
    const [post, _] = await queryMethods.findById("posts", postId)
    res.status(200).json({post})
  } catch (err) {
    console.log(err)
    next(err)
  }
}
