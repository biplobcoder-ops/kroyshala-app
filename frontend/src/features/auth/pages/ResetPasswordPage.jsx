// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// import Input from "../../../components/ui/Input/Input";
// import Button from "../../../components/ui/Button/Button";
// import Alert from "../../../components/ui/Alert/Alert";

// import { resetPasswordSchema } from "../schemas/resetPasswordSchema";
// import { resetPassword } from "../services/authApi";

// import validateForm from "../../../utils/validateForm";


// const ResetPasswordPage = () => {
//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();

//   // ==========================================
//   // Get Reset Token From URL
//   // ==========================================

//   const token = searchParams.get("token");


//   // ==========================================
//   // Form Data
//   // ==========================================

//   const [formData, setFormData] = useState({
//     newPassword: "",
//     confirmPassword: "",
//   });


//   // ==========================================
//   // UI State
//   // ==========================================

//   const [errors, setErrors] = useState({});

//   const [serverError, setServerError] = useState("");

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [resetSuccess, setResetSuccess] =
//     useState(false);


//   // ==========================================
//   // Handle Change
//   // ==========================================

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     // Update form data
//     setFormData((previousData) => ({
//       ...previousData,
//       [name]: value,
//     }));


//     // Clear field error
//     setErrors((previousErrors) => ({
//       ...previousErrors,
//       [name]: undefined,
//     }));


//     // Clear server error
//     setServerError("");


//     // Clear success message
//     setSuccessMessage("");
//   };


//   // ==========================================
//   // Handle Submit
//   // ==========================================

//   const handleSubmit = async (event) => {
//     event.preventDefault();


//     // Clear previous messages
//     setErrors({});
//     setServerError("");
//     setSuccessMessage("");


//     // ========================================
//     // Token Check
//     // ========================================

//     if (!token) {
//       setServerError(
//         "Reset link is missing or invalid. Please request a new password reset link."
//       );

//       return;
//     }


//     // ========================================
//     // Frontend Validation
//     // ========================================

//     const validationResult = validateForm(
//       resetPasswordSchema,
//       {
//         token,
//         ...formData,
//       }
//     );


//     if (!validationResult.isValid) {
//       setErrors(
//         validationResult.errors
//       );

//       return;
//     }


//     // ========================================
//     // Reset Password API
//     // ========================================

//     try {
//       setLoading(true);


//       const response = await resetPassword(
//         validationResult.data
//       );


//       // ======================================
//       // Success
//       // ======================================

//       setSuccessMessage(
//         response.message ||
//           "Password reset successfully. Please login with your new password."
//       );

//       setResetSuccess(true);


//       // Clear form
//       setFormData({
//         newPassword: "",
//         confirmPassword: "",
//       });

//     } catch (error) {

//       console.error(
//         "Reset password error:",
//         error
//       );


//       // ======================================
//       // Backend Error
//       // ======================================

//       const message =
//         error.response?.data?.message ||
//         "Unable to reset your password. Please try again.";

//       setServerError(message);

//     } finally {
//       setLoading(false);
//     }
//   };


//   // ==========================================
//   // Go To Login
//   // ==========================================

//   const handleLogin = () => {
//     navigate("/login", {
//       replace: true,
//     });
//   };


//   // ==========================================
//   // Go To Forgot Password
//   // ==========================================

//   const handleForgotPassword = () => {
//     navigate("/forgot-password");
//   };


//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

//       <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">

//         <section className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-8">


//           {/* ==================================
//               Header
//           ================================== */}

//           <div className="mb-7 text-center sm:mb-8">

//             <h1 className="text-2xl font-bold text-slate-900">
//               Reset Your Password
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               Create a new password for your
//               Kroyshala account.
//             </p>

//           </div>


//           {/* ==================================
//               Server Error
//           ================================== */}

//           {serverError && (
//             <div className="mb-6">

//               <Alert
//                 variant="error"
//                 title="Password reset failed"
//                 fullWidth
//               >
//                 {serverError}
//               </Alert>

//             </div>
//           )}


//           {/* ==================================
//               Success Message
//           ================================== */}

//           {successMessage && (
//             <div className="mb-6">

//               <Alert
//                 variant="success"
//                 title="Password reset successful"
//                 fullWidth
//               >
//                 {successMessage}
//               </Alert>

//             </div>
//           )}


//           {/* ==================================
//               Missing Token
//           ================================== */}

//           {!token && !serverError && (
//             <div className="mb-6">

//               <Alert
//                 variant="error"
//                 title="Invalid Reset Link"
//                 fullWidth
//               >
//                 This password reset link is missing
//                 or invalid. Please request a new
//                 reset link.
//               </Alert>

//             </div>
//           )}


//           {/* ==================================
//               Reset Form
//           ================================== */}

//           {!resetSuccess && token && (

//             <form
//               onSubmit={handleSubmit}
//               noValidate
//               className="space-y-5"
//             >


//               {/* New Password */}

//               <Input
//                 type="password"
//                 name="newPassword"
//                 label="New Password"
//                 placeholder="Enter your new password"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 errorMessage={
//                   errors.newPassword
//                 }
//                 passwordToggle
//                 required
//                 disabled={loading}
//                 fullWidth
//               />


//               {/* Confirm Password */}

//               <Input
//                 type="password"
//                 name="confirmPassword"
//                 label="Confirm New Password"
//                 placeholder="Confirm your new password"
//                 value={
//                   formData.confirmPassword
//                 }
//                 onChange={handleChange}
//                 errorMessage={
//                   errors.confirmPassword
//                 }
//                 passwordToggle
//                 required
//                 disabled={loading}
//                 fullWidth
//               />


//               {/* Submit Button */}

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full"
//               >
//                 {loading
//                   ? "Resetting password..."
//                   : "Reset Password"}
//               </Button>

//             </form>
//           )}


//           {/* ==================================
//               Login Button
//               Only after successful reset
//           ================================== */}

//           {resetSuccess && (
//             <button
//               type="button"
//               onClick={handleLogin}
//               className="
//                 mt-2
//                 w-full
//                 rounded-lg
//                 bg-blue-600
//                 px-4
//                 py-2.5
//                 text-sm
//                 font-medium
//                 text-white
//                 transition-colors
//                 hover:bg-blue-700
//               "
//             >
//               Login
//             </button>
//           )}


//           {/* ==================================
//               Forgot Password
//           ================================== */}

//           {!resetSuccess && (
//             <div className="mt-6 text-center text-sm text-slate-500">

//               Didn't receive a valid reset link?{" "}

//               <button
//                 type="button"
//                 onClick={
//                   handleForgotPassword
//                 }
//                 disabled={loading}
//                 className="
//                   font-medium
//                   text-blue-600
//                   transition-colors
//                   hover:text-blue-700
//                   hover:underline
//                   disabled:cursor-not-allowed
//                   disabled:opacity-50
//                 "
//               >
//                 Request Again
//               </button>

//             </div>
//           )}


//           {/* ==================================
//               Login
//           ================================== */}

//           {!resetSuccess && (
//             <div className="mt-3 text-center text-sm text-slate-500">

//               Remember your password?{" "}

//               <button
//                 type="button"
//                 onClick={handleLogin}
//                 disabled={loading}
//                 className="
//                   font-medium
//                   text-blue-600
//                   transition-colors
//                   hover:text-blue-700
//                   hover:underline
//                   disabled:cursor-not-allowed
//                   disabled:opacity-50
//                 "
//               >
//                 Login
//               </button>

//             </div>
//           )}

//         </section>

//       </div>

//     </main>
//   );
// };


// export default ResetPasswordPage;