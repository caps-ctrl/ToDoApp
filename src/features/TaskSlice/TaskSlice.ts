import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@/app/types/Task";




interface TaskState {
  Task: Task[]
}



const initialState : TaskState  =  {Task:[{
    id: 0,

    status: "Done",
    Task: "Buy groceries (milk, bread, butter)",
    tag: "Praca",
  },
  {
    id: 1,

    status: "Done",
    Task: "Reply to client’s email",
    tag: "Praca",
  },
  {
    id: 2,

    status: "Canceled",
    Task: "Go for a 5 km run",
    tag: "Praca",
  },
  {
    id: 3,

    status: "Done",
    Task: "Read 20 pages of a book",
    tag: "Praca",
  },
  {
    id: 4,

    status: "Todo",
    Task: "Clean up the desk",
    tag: "Praca",
  }]}





const TaskSlice = createSlice({
    name:"Tasks",
    initialState,
    reducers:{
        addNewTask: (state, action : PayloadAction<Task>) => { 
          const newId = state.Task.length > 0 ? state.Task[state.Task.length - 1].id + 1 : 1
          state.Task.push({
    id: newId,
    status: action.payload.status == null ? "None" : action.payload.status,
    Task: action.payload.Task,
    tag:action.payload.tag == null ? "None" : action.payload.tag,
          })
        },
        removeTask: (state, action: PayloadAction<number>) => {
        state.Task  =   state.Task.filter((state) =>state.id !== action.payload )             
        },
        editTask:() =>{},
    }
})


export const {addNewTask , removeTask , editTask } = TaskSlice.actions
export default TaskSlice.reducer