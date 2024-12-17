const db = require("../config/db")

function getDateStr() {
  let d = new Date()
  let yyyy = d.getFullYear()
  let mm = d.getMonth() + 1
  let dd = d.getDate()
  return `${yyyy}-${mm}-${dd}`
}

async function checkValExist(table_name, column_name, val) {
  let sql = `
  SELECT 1
  FROM ${table_name}
  WHERE ${column_name} = '${val}'
  `
  const [queryResult, _] = await db.execute(sql)
  if (queryResult.length > 0) {
    return true
  } else {
    return false
  }
}

exports.addPostRecord = async function addPostRecord(title, body) {
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
  const [queryResult, _] = await db.execute(sql)
  return queryResult
}

class DuplicateUsername extends Error {
  constructor() {
    super("Username already exists")
    this.name = "DuplicateUsername"
  }
}
exports.DuplicateUsername = DuplicateUsername

exports.addUserRecord = async function addUserRecord(username, password) {
  let createdAtDate = getDateStr()

  if (await checkValExist("users", "username", username)) {
    throw new DuplicateUsername()
  }

  let sql = `
  INSERT INTO users(
    username,
    password,
    joined_at
  )
  VALUES(
    '${username}',
    '${password}',
    '${createdAtDate}'
    )
  `
  
  const [queryResult, _] = await db.execute(sql)
  return queryResult
}

exports.deleteById = async function deleteById(table_name, id) {
  let sql = `DELETE FROM ${table_name} WHERE id = ${id}`
  const [queryResult, _] = await db.execute(sql)
  return queryResult
 }

 exports.findAll = async function findAll(table_name) {
  let sql = `SELECT * FROM ${table_name}`
  const [queryResult, _] = await db.execute(sql)
  return queryResult
 }

exports.findById = async function findById(table_name, id) {
  let sql = `SELECT * FROM ${table_name} WHERE id = ${id}`
  const [queryResult, _] = await db.execute(sql)
  return queryResult
}
