// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// import {
//   LuCircleCheck,
//   LuLoaderCircle,
//   LuMail,
// } from "react-icons/lu";

// import { verifyEmail } from "../services/authApi";

// const VerifyEmailPage = () => {
//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();

//   const token = searchParams.get("token");
//   const email = searchParams.get("email");

//   // --------------------------------
//   // UI State
//   // --------------------------------

//   const [loading, setLoading] = useState(Boolean(token));
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState("");

//   // --------------------------------
//   // Prevent Duplicate API Request
//   // --------------------------------

//   const verificationStarted = useRef(false);

//   // --------------------------------
//   // Verify Email
//   // --------------------------------

//   useEffect(() => {
//     // Token না থাকলে API call করার দরকার নেই
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     // একই token-এর জন্য দ্বিতীয়বার API call আটকাবে
//     if (verificationStarted.current) {
//       return;
//     }

//     verificationStarted.current = true;

//     const verifyUserEmail = async () => {
//       try {
//         setLoading(true);
//         setSuccess(false);
//         setMessage("");

//         const response = await verifyEmail(token);

//         setSuccess(true);

//         setMessage(
//           response.message ||
//             "Your email has been verified successfully."
//         );
//       } catch (error) {
//         console.error(
//           "Email verification failed:",
//           error
//         );

//         setSuccess(false);

//         setMessage(
//           error.response?.data?.message ||
//             "Email verification failed. Please register again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyUserEmail();
//   }, [token]);

//   // --------------------------------
//   // Register Again
//   // --------------------------------

//   const handleRegisterAgain = () => {
//     navigate("/register");
//   };

//   // --------------------------------
//   // Login
//   // --------------------------------

//   const handleLogin = () => {
//     navigate("/login");
//   };

//   // --------------------------------
//   // Loading UI
//   // --------------------------------

//   if (loading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

//         <section className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">

//           <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
//             <LuLoaderCircle
//               className="h-8 w-8 animate-spin text-blue-600"
//             />
//           </div>

//           <h1 className="text-2xl font-bold text-slate-900">
//             Verifying your email
//           </h1>

//           <p className="mt-3 text-sm leading-6 text-slate-500">
//             Please wait while we verify your email address.
//           </p>

//         </section>

//       </main>
//     );
//   }

//   // --------------------------------
//   // No Token
//   // --------------------------------

//   if (!token) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

//         <section className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">

//           {/* Icon */}

//           <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
//             <LuMail className="h-8 w-8 text-blue-600" />
//           </div>

//           {/* Title */}

//           <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
//             Check your email
//           </h1>

//           {/* Message */}

//           <p className="mt-3 text-sm leading-6 text-slate-500">
//             Please check your email to complete your
//             registration.
//           </p>

//           {/* Email */}

//           {email && (
//             <p className="mt-3 break-all text-sm font-medium text-slate-700">
//               {email}
//             </p>
//           )}

//           {/* Info */}

//           <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-700">
//             We have sent a verification link to your
//             email address. Please click the link to
//             verify your account.
//           </div>

//         </section>

//       </main>
//     );
//   }

//   // --------------------------------
//   // Verification Success
//   // --------------------------------

//   if (success) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

//         <section className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">

//           {/* Success Icon */}

//           <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
//             <LuCircleCheck className="h-9 w-9 text-green-600" />
//           </div>

//           {/* Title */}

//           <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
//             Email Verified
//           </h1>

//           {/* Message */}

//           <p className="mt-3 text-sm leading-6 text-slate-500">
//             {message}
//           </p>

//           {/* Login Button */}

//           <button
//             type="button"
//             onClick={handleLogin}
//             className="
//               mt-7
//               w-full
//               rounded-lg
//               bg-blue-600
//               px-4
//               py-3
//               text-sm
//               font-semibold
//               text-white
//               transition
//               hover:bg-blue-700
//               focus:outline-none
//               focus:ring-2
//               focus:ring-blue-500
//               focus:ring-offset-2
//             "
//           >
//             Login
//           </button>

//         </section>

//       </main>
//     );
//   }

//   // --------------------------------
//   // Verification Failed
//   // --------------------------------

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

//       <section className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">

//         {/* Icon */}

//         <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
//           <LuMail className="h-8 w-8 text-red-600" />
//         </div>

//         {/* Title */}

//         <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
//           Email Verification Failed
//         </h1>

//         {/* Message */}

//         <p className="mt-3 text-sm leading-6 text-slate-500">
//           {message}
//         </p>

//         {/* Register Again */}

//         <button
//           type="button"
//           onClick={handleRegisterAgain}
//           className="
//             mt-7
//             w-full
//             rounded-lg
//             bg-blue-600
//             px-4
//             py-3
//             text-sm
//             font-semibold
//             text-white
//             transition
//             hover:bg-blue-700
//             focus:outline-none
//             focus:ring-2
//             focus:ring-blue-500
//             focus:ring-offset-2
//           "
//         >
//           Register Again
//         </button>

//         {/* Bottom Message */}

//         <p className="mt-4 text-xs leading-5 text-slate-400">
//           Your verification link may have expired or
//           may no longer be valid.
//         </p>

//       </section>

//     </main>
//   );
// };

// export default VerifyEmailPage;