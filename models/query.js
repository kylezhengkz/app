const db = require("../config/db")

function getDateStr() {
  let d = new Date()
  let yyyy = d.getFullYear()
  let mm = d.getMonth() + 1
  let dd = d.getDate()
  return `${yyyy}-${mm}-${dd}`
}

async function add_post_record(title, body) {
  let createdAtDate = getDateStr()

  let sql = `
  INSERT INTO posts(
    title,
    body,
    created_at
  )
  VALUES(
    '${title}',
    '${body}',
    '${createdAtDate}'
    )
  `
  await db.execute(sql)
}

async function add_user_record(username, password) {
  let createdAtDate = getDateStr()

  let sql = `
  INSERT INTO posts(
    username,
    password,
    created_at
  )
  VALUES(
    '${username}',
    '${password}',
    '${createdAtDate}'
    )
  `
  await db.execute(sql)
}

async function delete_row(id) {
  let sql = `DELETE FROM posts WHERE id = ${id}`
  await db.execute(sql)
 }

 async function findAll() {
  let sql = "SELECT * FROM posts"
  await db.execute(sql)
 }

async function findById(id) {
  let sql = `SELECT * FROM posts WHERE id = ${id}`
  await db.execute(sql)
}
