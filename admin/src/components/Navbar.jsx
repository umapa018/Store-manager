import sadImage from '../assets/sad1.png';

const navbar = ({setToken}) => {
    return (
        <div className='flex items-center justify-between py-2 px-[4%]'>
            <img className='w-[max(10%,80px)]' src={sadImage} alt="" />
            <button onClick={()=>setToken('')} className='bg-green-600 text-white px-4 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm '>Logout</button>
        </div>
    )
}

export default navbar