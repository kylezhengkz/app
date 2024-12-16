const db = require("../config/db")

class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  async save() {
    let d = new Date()
    let yyyy = d.getFullYear()
    let mm = d.getMonth() + 1
    let dd = d.getDate()

    let createdAtDate = `${yyyy}-${mm}-${dd}`

    let sql = `
    INSERT INTO posts(
      username,
      password,
      created_at
    )
    VALUES(
      '${this.username}',
      '${this.password}',
      '${createdAtDate}'
      )
    `

    const [newUser, _] = await db.execute(sql)
    return newUser
  }

  static async delete(id) {
    let sql = `DELETE FROM users WHERE id = ${id}`
    const [queryResult, _] = await db.execute(sql)
    return queryResult
   }

  static async findAll() {
    let sql = "SELECT * FROM posts"
    const [queryResult, _] = await db.execute(sql)
    return queryResult
   }

  static async findById(id) {
    let sql = `SELECT * FROM posts WHERE id = ${id}`
    const [queryResult, _] = await db.execute(sql)
    return queryResult
  }
}

module.exports = User
