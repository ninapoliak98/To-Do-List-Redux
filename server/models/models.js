const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
})

const Todo = sequelize.define('todo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  task: { type: DataTypes.STRING, allowNull: false },
  isComplete: { type: DataTypes.BOOLEAN }
})

const Todolist = sequelize.define('todo_list', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
})


User.hasMany(Todo)
Todo.belongsTo(User)

User.hasMany(Todolist)
Todolist.belongsTo(User)

Todolist.hasMany(Todo)
Todo.belongsTo(Todolist)


module.exports = {
  User,
  Todo,
  Todolist
}