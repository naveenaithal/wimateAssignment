const Todo=require('../models/TodoModal.js')

const addTodo = async (req, res) => {
    console.log(req.body)
    const {taskName,dueDate,status,priority,description,_id}=req.body


    try {
        if (_id) {
              let todo = await Todo.findByIdAndUpdate(
          { _id: _id },
          {   taskName,dueDate,status,priority,description}
       ,
          { new: true, runValidators: true }
          )
            res.status(201).json({ msg: todo })
            return
        }
         let todo = new Todo({
     taskName,dueDate,status,priority,description
    })
    await  todo.save()
  res.status(201).json({msg:"New Todo added to the list"})

        
    } catch (error) {
        
    }
}


const   deleteTodo = async (req, res) => {
    const {id}=req.params
    try {
 await Todo.deleteOne({_id:id})
        res.status(200).json({msg:"Todo deleted"})

    }
    catch (error) {
        console.log(error)
        
    }
    
}
const getTodos = async (req,res) => {
    try {
        const allTodos = await Todo.find({})
        res.status(200).json({data:allTodos})

    } catch (error) {
        console.log(error)
        
    }
    
}





const updateTodoListStatus = async (req, res) => {
    const {id}=req.params
   try {
      let todo = await Todo.findByIdAndUpdate(
          { _id: id },
          {   status:"completed"}
       ,
          { new: true, runValidators: true }
          )
          res.status(201).json({msg:"task completed"})
   } catch (error) {
    console.log(error)
    
   }
         
}



module.exports={addTodo,getTodos,updateTodoListStatus,deleteTodo}