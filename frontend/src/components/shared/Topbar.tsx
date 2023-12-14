import {useSignOutAccount} from "@/lib/tanstack-query/queriesAndMutations.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Topbar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate(0)
        }
    }, [isSuccess])

    return (
        <div className='bg-white flex items-center p-5'>
            <img src='/assets/logo.png' width={40} height={40} alt='logo'/>
            <p className='text-2xl font-medium ml-1'>TransPod</p>
            <div className='ml-auto mr-3 hover:underline cursor-pointer' onClick={()=>signOut()}>
                Logout
            </div>
        </div>
    )
}
export default Topbar
