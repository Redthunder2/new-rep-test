import {
    useQuery,
  } from '@tanstack/react-query'
  
  export default function Notes() {
    return (
      
        <Example />
      
    )
  }
  
  function Example() {
    const { isLoading, error, data } = useQuery({
      queryKey: ['notes'],
      queryFn: () =>
        fetch('http://localhost:3001/notes').then((res) =>res.json(),),
    })
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message
  
    return (
      <div>
        <h2>data count:  {data.length}</h2>
        <div className='flex flex-col items-center bg-blue-200 gap-3'>
        {
          data.map(m=>{return <p>{m.title}{m.content}</p>})
          }
          </div>
      </div>
    )
  }