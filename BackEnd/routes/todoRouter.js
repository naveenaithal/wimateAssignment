const express=require('express')
const { addTodo,getTodos,updateTodoListStatus,deleteTodo } = require('../controllers/todoController')
const router=express.Router()





router.post('/addTodo',addTodo)
router.delete('/deleteTodo/:id',deleteTodo)
router.get('/getTodos',getTodos)
router.get('/updateTodo/:id',updateTodoListStatus)

module.exports=router