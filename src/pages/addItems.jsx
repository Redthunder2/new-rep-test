import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from 'axios'

export default function AddItems({isOpen,setIsOpen}){
    const [itemName,setItemName] = useState('');
    const [itemPrice,setItemPrice] = useState('')
    const [itemImg,setItemImg] = useState('')
    const [itemBr,setItemBr] = useState('')
    const [itemCat,setItemCat] = useState('')
    const [itemCount,setItemCount] = useState('')

    const queryClient = useQueryClient()

    const mutation = useMutation({mutationFn:insertItemFn,
        onSuccess:()=>{
            setItemName("")
            setItemPrice("")
            setItemImg("")
            setItemBr("")
            setItemCat("")
            setItemCount("")
        }
    })

    function closeForm(e){
        e.preventDefault();
        setIsOpen(false)
    }

    function insertItemFn(){
        return axios.post('http://localhost:5000/create',{itemName, itemPrice,itemBr,itemImg,itemCat,itemCount})
        .then(response =>{ console.log(response.data);return response.data.item})
        .then((item)=>{
            console.log('item:',item)
            if(!item){
                throw new Error("an error occured")
            }

            
            setIsOpen(false)
            queryClient.setQueriesData('prods',(old)=>[item,...old])
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        mutation.mutate()
    }

    return(<>
   <div className={`absolute w-full h-full top-0 left-0 z-50 flex justify-center items-center ${!isOpen ? 'hidden' : ''}`}>
      <div className='bg-black opacity-50 absolute w-full h-full top-0 left-0'></div>
      <form className='bg-white w-full md:w-1/2 p-5 rounded shadow-md text-gray-800 prose relative' 
        onSubmit={handleSubmit}>
        <h2 className='text-center'>Add Item</h2>
        {mutation.isError && <span className='block mb-2 text-red-400'>{mutation.error.message ? mutation.error.message : mutation.error}</span>}
        <input type="text" placeholder='itemName' name="itemName" className='rounded-sm w-full border px-2' 
          value={itemName} onChange={(e) => setItemName(e.target.value)} />
           <input type="Number" placeholder='itemPrice' name="itemPrice" className='rounded-sm w-full border px-2' 
          value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
         <input type="text" placeholder='itemImg' name="itemImg" className='rounded-sm w-full border px-2' 
          value={itemImg} onChange={(e) => setItemImg(e.target.value)} />
           <input type="text" placeholder='itemBrand' name="itemBrand" className='rounded-sm w-full border px-2' 
          value={itemBr} onChange={(e) => setItemBr(e.target.value)} />
           <input type="text" placeholder='itemCat' name="itemCat" className='rounded-sm w-full border px-2' 
          value={itemCat} onChange={(e) => setItemCat(e.target.value)} />
           <input type="text" placeholder='itemCount' name="itemCount" className='rounded-sm w-full border px-2' 
          value={itemCount} onChange={(e) => setItemCount(e.target.value)} />
        <div>
          <button type="submit" className='mt-2 bg-red-400 hover:bg-red-600 text-white p-3 rounded mr-2 disabled:pointer-events-none' 
            disabled={mutation.isLoading}>
            Add</button>
          <button className='mt-2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded'
            onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
    </>)

}