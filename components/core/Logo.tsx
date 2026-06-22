import { BiSolidMoviePlay } from "react-icons/bi";

function Logo({ size }: { size: "sm" | "md" | "lg" }) {

    const sizeMap = {
        sm: 20,
        md: 24,
        lg: 30
    }

    const textSizeMap = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-3xl"
    }

  return (
    <div className='flex items-center'>
         <BiSolidMoviePlay size={sizeMap[size]} className='text-red-500 mr-1'/>
         <span className={`text-red-500 font-bold ${textSizeMap[size]}`}>CINE</span>
         <span className={`text-black dark:text-white font-bold ${textSizeMap[size]}`}>LOG</span>
    </div>
  )
}

export default Logo