import './App.css';
import Fetching from './pages/fetching';
import AddItems from './pages/addItems'
import Form from './pages/addNotes'
import NotesAdd from './pages/notesAdd'
import Notes from './pages/notes'
import {useState} from 'react'
import NewNotes from './pages/NewNotes';
import { QueryClient } from '@tanstack/react-query';

function App(props) {
  const [isOpen,setIsOpen] = useState(false)
  const queryClient = props.client;
  function addNote () {
    setIsOpen(true)
}


  return (
    <>
       {/*  <Notes /> */}
        <button className='bg-blue-500 px-3 py-1 rounded my-0 mx-auto block hover:bg-blue-600' onClick={addNote}>Add</button>
        <Fetching/>
        <NewNotes />
       {/*  <NotesAdd isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        { <AddItems isOpen={isOpen} setIsOpen={setIsOpen} /> } 
        {/* <Form  isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        <button  className='bg-blue-500 px-3 py-1 rounded my-0 mx-auto block mt-5 hover:bg-blue-600' onClick={()=>{
          const data = queryClient.getQueryData(['newNotes'])
          console.log(data)
        }}>Get Data</button>
        </>
  );
}

export default App;
