import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { TODO } from 'src/assets/interfaces/todoInterface';
import { TodoService } from 'src/service/todo.service';
import Swal from 'sweetalert2';

  const data = [
    {taskName: 'Test 1', description: ' sitspiciatis harum dolorum, blanditiis voluptatum', priority: 'high',dueDate:'10-10-2023', status: 'active' },
    {taskName: 'Test 2 With Long Text', description: ' sit amet consectetur adipisicing elit. Rem culpa iste perspiciatis harum dolorum, blanditiis voluptatum', priority: 'high',dueDate:'21-11-2020', status: 'completed' },
    {taskName: 'Test 3 With small Text And Long Text', description: ' sit amet consectetur adipisicing elit. Rem culpa iste perspiciatis harum dolorum, blanditiis voluptatum', priority: 'high',dueDate:'10-10-2023', status: 'active' },
    {taskName: 'Random Text', description: ' sit amet consectetur adipisicing elit. Rem culpa iste perspiciatis harum dolorum, blanditiis voluptatum ', priority: 'high',dueDate:'09-11-2024', status: 'active' }
  ]
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  

export class AppComponent {
  title = 'wimate_fe';
isUpdate=false
  toDetails: any = {_id:'', taskName: '', description: '', priority: 'high',dueDate:'', status: '' }
  
toDoList:TODO[]=[]

  
  
  constructor(private todoService:TodoService)
  { }

  ngOnInit() {
 
      //  this.toDoList.push(...JSON.parse(localStorage.getItem('todos') || '{}'));
     this.getAllTodos()
    // console.log(this.users)
}



  getAllTodos() {
    this.todoService.getTodo().subscribe((res:any) => {
      console.log(res.data)
    
    //   let firstArray = []
    //   let lastArray=[]
    //    for(let i=0;i< res.data.length;i++){
    //  if(res.data[i].priority==='high' && res.data[i].status==='active'){
    //      firstArray.push(res.data[i])
         
    //  }
    //  else{
    //  lastArray.push(res.data[i])
    //  }}
       this.toDoList=res.data.sort((a:any, b:any) => a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1);
    },
       (error: HttpErrorResponse) => {
    console.log(error.error);
  }
    )
}

  
  submitForm(form: any) {

this.todoService.postTodo(form.value).subscribe((res) => {
          //  console.log(res)
  if (res) {
     
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Todo added to the list',
      showConfirmButton: false,
      timer: 1500
    })
   }
           this.getAllTodos()
          },
  (error: HttpErrorResponse) => {
    console.log(error.error);
  }
)
    

    
    
    
  //   if (this.toDoList.length === 0) {
     
  //     this.toDoList.push(form.value)
      
  //   } else {
  //     if (this.toDoList.some((item) => item.taskName === form.value.taskName)) {
  //       this.toDoList.forEach((item,i)=>{
  //         if(item.taskName===form.value.taskName){
  //           this.toDoList[i]=form.value
  //         }
  //      })
      
  //   }
  //     else {
  //         this.toDoList.push(form.value)
  //     }
  //      console.log(this.toDoList)
      
  // }
  //   localStorage.setItem('todos',JSON.stringify(this.toDoList))

    
    form.resetForm();
  
  }
  


 
  deleteTODO(details: TODO) {


Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {


 this.todoService.deleteTodo(details._id).subscribe((res:any) => {
      console.log(res)
      if (res.msg === "Todo deleted") {
        this.getAllTodos()
         Swal.fire(
      'Deleted!',
      'Todo has been deleted.',
      'success'
    )
        return
      }
          },
  (error: HttpErrorResponse) => {
    console.log(error.error);
  }
)

   
  }
})
   
  //   this.users.splice(i, 1)
  //  localStorage.setItem('users',JSON.stringify(this.users))

    
  } 


  markAdCompleted(details: TODO) {
    const {_id}=details
    this.todoService.updateTodo(_id).subscribe((res:any) => {
      console.log(res)
      if (res.msg === "task completed") {
        this.getAllTodos()
        Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Todo completed',
  showConfirmButton: false,
  timer: 1500
})
        return
      }
          },
  (error: HttpErrorResponse) => {
    console.log(error.error);
  }
)
    
  }

  moreInfo(i:Number) {
    
  }

  edit(todo: TODO) {
   this.isUpdate=true
    this.toDetails = todo
    this.toDetails._id=todo._id
  }
  submitUpdatedFrom(form: any) {
    let finalForm = form.value
    finalForm._id=this.toDetails._id
    form.resetForm();
    Swal.fire({
      position: 'center',
      icon: 'success',
  title: 'Todo Updated',
  showConfirmButton: false,
  timer: 1500
})

this.isUpdate=false
    
  }
  
}
