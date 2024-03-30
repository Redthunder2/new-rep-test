import {
    useQuery,
  } from '@tanstack/react-query'
  
  export default function Fetching() {
    return (
      
        <Example />
      
    )
  }
  
  function Example() {
    const { isLoading, error, data } = useQuery({
      queryKey: ['prods'],
      queryFn: () =>
        fetch('http://localhost:5000/products').then((res) =>
          res.json(),
        ),
    })
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message
  
    return (
      <div>
        <h2>data count:  {data.length}</h2>
        <div className='flex justify-center bg-blue-200 gap-3'>
        {
          data.map(e=>{return <div> 
            <p>{e.prodName}</p>
            <img className='w-[100px]' src={e.prodImg} />
            </div>})
          }
          </div>
      </div>
    )
  }