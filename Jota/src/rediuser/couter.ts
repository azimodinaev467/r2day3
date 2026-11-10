import { createSlice } from '@reduxjs/toolkit'
export interface IData {
    id:number
    name:string
    job:string
    age:number
}
export interface CounterState {
  value: number
  data:IData[]
}

const initialState: CounterState = {
  value: 100,
  data:[
    {
        id:1,
        name:"a",
        job:"aa",
        age:16
    },{
        id:2,
        name:"a2",
        job:"fermer",
        age:16
    },{
        id:3,
        name:"a3",
        job:"doctor",
        age:21
 ,   } ,
  {
        id:4,
        name:"a3",
        job:"doctor",
        age:21
    }
    ,{
        id:2,
        name:"a2",
        job:"fermer",
        age:16
    },{
        id:3,
        name:"a3",
        job:"doctor",
        age:21
 ,   }
 ,{
        id:2,
        name:"a2",
        job:"fermer",
        age:16
    },{
        id:3,
        name:"a3",
        job:"doctor",
        age:21
 ,   }
    
  ]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   deleteUser:(state,{payload:id})=>{
    state.data = state.data.filter((e)=>e.id!=id)
   },
   addUser:(state,{payload:newUser})=>{
    state.data = [...state.data,newUser]
   },
   editUser:(state,{payload:newUser})=>{
    state.data = state.data.map((e)=>e.id==newUser.id?newUser:e)
   }
  }
})

export const { deleteUser,addUser,editUser} = counterSlice.actions


export default counterSlice.reducer