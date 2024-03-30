import {useQuery,useQueryClient} from '@tanstack/react-query'

export default function NewNotes(){
    return <NotesFetch />
}

function NotesFetch(){
    const queryClient = useQueryClient();
    const {isLoading,error, data} = useQuery({
        queryKey:['newNotes'],
        queryFn: ()=>{
            return fetch('http://localhost:3001/notes')
            .then((res)=>{console.log(res);return res.json()})
            /* .then(({data})=>console.log(data))
            .catch((error)=>console.log(error)) */
        }
    })

    if(isLoading) return <div>Fetch loading</div> 
    if(error) return <div>Fetch Failed</div>
    if(data){
        return(<> <div className='flex gap-2 flex-wrap w-100 justify-center'>
                {data.map((e)=>{
                    return <div className='bg-yellow-100 hover:bg-yellow-300 mt-2 cursor-pointer w-[5rem]'>
                        <p>Title:{e.title}</p>
                        <p>{e.content}</p>
                    </div>
                })}
                
        </div>
        <button  className='bg-blue-500 px-3 py-1 rounded my-0 mx-auto block mt-3    hover:bg-blue-600' onClick={()=>{
          const data = queryClient.getQueryData(['newNotes'])
          console.log('data: ',data)
        }}>Get Data 2</button>
        </>)
    }
}