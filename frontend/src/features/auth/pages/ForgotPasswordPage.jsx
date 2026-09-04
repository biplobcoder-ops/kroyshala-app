// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Input from "../../../components/ui/Input/Input";
// import Button from "../../../components/ui/Button/Button";
// import Alert from "../../../components/ui/Alert/Alert";

// import { forgotPasswordSchema } from "../schemas/forgotPasswordSchema";
// import { forgotPassword } from "../services/authApi";


// const ForgotPasswordPage = () => {
//   const navigate = useNavigate();

//   // ==========================================
//   // Form State
//   // ==========================================

//   const [formData, setFormData] = useState({
//     email: "",
//   });


//   // ==========================================
//   // UI State
//   // ==========================================

//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);


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
//     // Frontend Validation
//     // ========================================

//     const result = forgotPasswordSchema.safeParse(
//       formData
//     );

//     if (!result.success) {
//       const fieldErrors = {};

//       result.error.issues.forEach((issue) => {
//         const fieldName = issue.path[0];

//         if (fieldName) {
//           fieldErrors[fieldName] = issue.message;
//         }
//       });

//       setErrors(fieldErrors);

//       return;
//     }


//     // ========================================
//     // API Request
//     // ========================================

//     try {
//       setIsSubmitting(true);

//       /*
//        * Send only the email string.
//        *
//        * authApi.js will create:
//        *
//        * {
//        *   email: "user@example.com"
//        * }
//        */
//       const response = await forgotPassword(
//         result.data.email
//       );


//       // ======================================
//       // Success
//       // ======================================

//       setSuccessMessage(
//         response.message ||
//           "If this email exists, we sent a password reset link."
//       );


//       // Clear email after successful request
//       setFormData({
//         email: "",
//       });

//     } catch (error) {

//       // ======================================
//       // Backend Error
//       // ======================================

//       const message =
//         error.response?.data?.message ||
//         "Unable to send password reset link. Please try again.";

//       setServerError(message);

//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   // ==========================================
//   // Go To Login
//   // ==========================================

//   const handleLogin = () => {
//     navigate("/login");
//   };


//   // ==========================================
//   // Go To Register
//   // ==========================================

//   const handleRegister = () => {
//     navigate("/register");
//   };


//   // ==========================================
//   // JSX
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
//               Forgot Password?
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               Enter your email address and we'll send you a
//               password reset link.
//             </p>

//           </div>


//           {/* ==================================
//               Server Error
//           ================================== */}

//           {serverError && (
//             <div className="mb-6">

//               <Alert
//                 variant="error"
//                 title="Request failed"
//                 fullWidth
//               >
//                 {serverError}
//               </Alert>

//             </div>
//           )}


//           {/* ==================================
//               Success
//           ================================== */}

//           {successMessage && (
//             <div className="mb-6">

//               <Alert
//                 variant="success"
//                 title="Check your email"
//                 fullWidth
//               >
//                 {successMessage}
//               </Alert>

//             </div>
//           )}


//           {/* ==================================
//               Form
//           ================================== */}

//           <form
//             onSubmit={handleSubmit}
//             noValidate
//             className="space-y-5"
//           >

//             <Input
//               type="email"
//               name="email"
//               label="Email Address"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               errorMessage={errors.email}
//               disabled={isSubmitting}
//               required
//               fullWidth
//             />


//             {/* ==================================
//                 Submit Button
//             ================================== */}

//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full"
//             >
//               {isSubmitting
//                 ? "Sending reset link..."
//                 : "Send Reset Link"}
//             </Button>

//           </form>


//           {/* ==================================
//               Login
//           ================================== */}

//           <div className="mt-6 text-center text-sm text-slate-500">

//             Remember your password?{" "}

//             <button
//               type="button"
//               onClick={handleLogin}
//               disabled={isSubmitting}
//               className="
//                 font-medium
//                 text-blue-600
//                 transition-colors
//                 hover:text-blue-700
//                 hover:underline
//                 disabled:cursor-not-allowed
//                 disabled:opacity-50
//               "
//             >
//               Login
//             </button>

//           </div>


//           {/* ==================================
//               Register
//           ================================== */}

//           <div className="mt-3 text-center text-sm text-slate-500">

//             Don't have an account?{" "}

//             <button
//               type="button"
//               onClick={handleRegister}
//               disabled={isSubmitting}
//               className="
//                 font-medium
//                 text-blue-600
//                 transition-colors
//                 hover:text-blue-700
//                 hover:underline
//                 disabled:cursor-not-allowed
//                 disabled:opacity-50
//               "
//             >
//               Create Account
//             </button>

//           </div>

//         </section>

//       </div>

//     </main>
//   );
// };


// export default ForgotPasswordPage;