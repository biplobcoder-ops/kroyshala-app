import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../services/authApi2';
import { LuCircleCheck, LuLoaderCircle, LuMail } from 'react-icons/lu';
import Button from '../../../components/ui/Button/Button';

const VerifyEmailPage2 = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [loading,setLoading] = useState(Boolean(token));
  const [success,setSuccess] = useState(false);
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const varificationStarted = useRef(false);
  useEffect(() => {
  if(!token) {
    setLoading(false)
    return
  };
  if(varificationStarted.current) {
    return
  };
  varificationStarted.current = true;
  const verificationEmail = async () => {
    try {
    setLoading(true);
    const response = await verifyEmail(token)
    setSuccess(true)
    setMessage(response.message);

  } catch (error) {
    setMessage(error.response?.data?.message || "email Verification fail. Register again");

  } finally{
    setLoading(false)
  };
 
  }
   verificationEmail();
  },[token]);
 if(loading) {
   return (
    <main className='min-h-screen bg-slate-50 flex justify-center items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
         <div className='w-full max-w-md bg-white text-center rounded-2xl p-6 sm:p-8 shadow-sm'>
          <div className='mx-auto flex justify-center items-center mb-6 rounded-full bg-blue-50 w-16 h-16'>
            <LuLoaderCircle className='w-8 h-8 animate-spin text-blue-700' />
          </div>
          <h1 className='text-slate-800 text-2xl font-semibold'>Verifying your email</h1>
          <p className='text-slate-600 text-sm mt-3'>Please wait while your email verifing now</p>
         </div>
    </main>
  )
 }
 if(!token) {
  return (
  <main className='min-h-screen bg-slate-50 flex justify-center items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
    <div className='w-full  max-w-md rounded-2xl bg-white shadow-sm p-6 sm:p-8 text-center'>
      <div className='mx-auto w-16 h-16 flex justify-center items-center mb-6 bg-blue-50 rounded-full'>
        <LuMail className='w-8 h-8 text-blue-600' />
      </div>
      <h1 className='text-2xl text-slate-900 mb-3 font-bold'>Check your email</h1>
      <p className='text-sm text-slate-600 leading-6'>please check your email to complete registration process</p>
        {email && (
          <h1 className='text-slate-900 font-semibold mt-b'>{email}</h1>
        )}
        <div className='px-4 py-3 border border-blue-100 rounded-lg text-blue-700 text-sm mt-5 bg-blue-50'>
            We have sent a verification link to your
            email address. Please click the link to
            verify your account.
        </div>
    </div>
  </main>
 )
 }
if(success) {
  
 return (
  <main className='min-h-screen bg-slate-50 flex justify-center items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>

    <div className='w-full max-w-md text-center rounded-2xl bg-white shadow-sm p-6 sm:py-8'>
      <div className='mx-auto mb-6 flex justify-center items-center bg-green-50 h-16 w-16 rounded-full'>
         <LuCircleCheck className='w-8 h-8 text-green-700'/>
      </div>
      <h1 className='text-2xl sm:text-3xl font-bold mb-5 text-slate-900'>Email verified</h1>
      <p className='text-sm text-slate-800 font-semibold'>{message}</p>
      <Button
      type='button'
      variant='primary'
      fullWith
      onClick={() => navigate("/login") }
      className={"cursor-pointer mt-5"}
      >
        Login
      </Button>
    </div>
  </main>
 )

}
return (
  <main className='min-h-screen bg-slate-50 flex justify-center items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
    <div className='w-full max-w-md text-center rounded-2xl bg-white shadow-sm p-6 sm:py-8'>
      <div className='mx-auto mb-6 flex justify-center items-center bg-red-50 w-16 h-16 rounded-full'>
        <LuMail className='text-red-500 w-8 h-8 ' />
      </div>
      <h1 className='text-slate-800 text-2xl mb-4 font-bold'>Email verify fail</h1>
      <p className='text-sm text-slate-600 mt-3 font-semibold'>{message}</p>
      <Button
      type='button'
      variant='primary'
      fullWith
      onClick={() => navigate("/register")}
      className={"mt-6 cursor-pointer"}
      >
        Register Again
      </Button>

    <p className='text-sm text-slate-500 mt-2 font-medium leading-6'>Your verification link may have expired or
          may no longer be valid.</p>

    </div>
  </main>
)
}

export default VerifyEmailPage2