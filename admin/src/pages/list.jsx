import axios from "axios"
import { useEffect, useState } from "react"
import { backendUrl, currency } from "../App"
import { toast } from "react-toastify"

const list = ({token}) => {

    const [List,setList] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl+'/api/product/list')
            if(response.data.success){
            setList(response.data.products);
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl+'/api/product/remove/',{id} , {headers:{token}})
            if(response.data.success){
                toast.success(response.data.message)
                await fetchList();
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }


    useEffect(()=>{
        fetchList()
    },[])

    return (
        <>
            <p className="mb-4  ">All Products List</p>
            <div className="flex flex-col gap-2">
                {/*table list*/}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-200 text-sm">
                    <b>Image</b>
                    <b className="px-6">Name</b>
                    <b className="px-12">Category</b>
                    <b className="px-14">Price</b>
                    <b className="text-center">Action</b>
                </div>

                {/*table list*/}
                {
                    List.map((item, index)=> (
                        <div className=" overflow-x-auto grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm" key={index}>
                            <img className="w-6" src={item.image[0]} />
                            <p className="">{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center  text-lg cursor-pointer">X</p>
                        </div>

                    ))
                }
            </div>
        </>
    )
}

export default list