
import { useState } from 'react'
import upload from '../assets/upload.png'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const add = ({token}) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("Laptop");

    //submit form execution
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData()

            formData.append("name",name)
            formData.append("description",description)
            formData.append("price",price)
            formData.append("quantity",quantity)
            formData.append("category",category)

            //if image avail then append
            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)

            //backend connection  to send data
            const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

            if(response.data.success){
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setPrice('')
                setQuantity('')
            } else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }




    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-start w-full gap-3'>
            <div >
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img className='w-28 ' src={image1 ? URL.createObjectURL(image1) : upload} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type='file' id="image1" hidden ></input>
                    </label>

                    <label htmlFor="image2">
                        <img className='w-28' src={image2 ? URL.createObjectURL(image2) : upload} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type='file' id="image2" hidden ></input>
                    </label>
                </div>

            </div>
            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' required placeholder='Type here'></input>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text' required placeholder='Write content here' />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Laptop">Laptop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Tv">Tv</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='Number' placeholder='25'></input>
                </div>
                <div>
                    <p className='mb-2'>Product quantity</p>
                    <input onChange={(e) => setQuantity(e.target.value)} value={quantity} className='w-full px-3 py-2 sm:w-[120px]' type='Number' placeholder='5'></input>
                </div>
            </div>
            <button className='w-28 py-3 mt-4 bg-green-500 text-white rounded-full font-bold  ' type='submit'>ADD</button>
        </form>
    )
}

export default add;