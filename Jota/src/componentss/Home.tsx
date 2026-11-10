import { addUser, deleteUser, editUser } from '@/rediuser/couter'
import type { RootState } from '@/store/store'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const Home = () => {
 const {data} = useSelector((store:RootState)=>store.counter)
const dispatch  = useDispatch()
const [elem,setElem] = useState({id:null,name:"",age:null,job:""})
const handleSubmit =(event)=>{
  event.preventDefault()
  const newUser={
    id:elem.id?elem.id:Date.now(),
    name:event.target.elements.name.value,
    age:event.target.age.value,
    job:event.target.job.value,
  }
  elem.id? dispatch(editUser(newUser)):  dispatch(addUser(newUser))
  event.target.reset()
  setElem({id:null,name:"",age:null,job:""})
}

const handleEdit =(e)=>{
  setElem(e)
}

return (
  <div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[400px] mx-auto">
      <Input defaultValue={elem.name} name="name" type="text" placeholder="Name" />
      <Input defaultValue={elem.age ?? ''} name="age" type="number" placeholder="Age" />
      <Input defaultValue={elem.job} name="job" type="text" placeholder="Job" />

      <Button type="submit">
        {elem.id ? "save" : "submit"}
      </Button>
    </form>

    <div>
      {
        data.map((e) => {
          return (
            <Card key={e.id} className="flex gap-3 border p-4 rounded-2xl w-[400px] my-2 mx-auto">
              <h1>Name: {e.name}</h1>
              <p>Age: {e.age}</p>
              <p>Job: {e.job}</p>

              <Button variant="destructive" onClick={() => dispatch(deleteUser(e.id))}>
                delete
              </Button>

              <Button variant="outline" onClick={() => handleEdit(e)}>
                edit
              </Button>
            </Card>
          )
        })
      }
    </div>
  </div>
)
}

export default Home
