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
            <p className="mb-4 text-lg  ">All Products List</p>
            <div className="flex flex-col gap-2">
                {/*table list*/}
                <div className="grid grid-cols-4  items-center py-2 px-4 border-b bg-gray-100 text-sm font-semibold">
                    {/*<b>Image</b>*/}
                    <b className="px-6">Name</b>
                    <b className="px-12">Category</b>
                    <b className="px-14">Price</b>
                    <b className="text-center">Action</b>
                </div>

                {/*table list*/}
                {
                    List.map((item, index)=> (
                        <div className=" grid grid-cols-4  items-center py-2 px-4 border-b text-sm" key={index}>
                            {/*<img className="" src={item.image[0]} />*/}
                            <p className="px-4">{item.name}</p>
                            <p className="px-14">{item.category}</p>
                            <p className="px-14">{currency}{item.price}</p>
                            <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center  text-lg  text-red-500 font-bold cursor-pointer">X</p>
                        </div>

                    ))
                }
            </div>
        </>
    )
}

export default list