// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import Input from "../../../components/ui/Input/Input";
// import Button from "../../../components/ui/Button/Button";
// import Alert from "../../../components/ui/Alert/Alert";

// import { loginSchema } from "../schemas/loginSchema";
// import { loginUser } from "../services/authApi";

// import validateForm from "../../../utils/validateForm";


// const LoginPage = () => {
//   const navigate = useNavigate();

//   // ==========================================
//   // Form Data
//   // ==========================================

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });


//   // ==========================================
//   // UI State
//   // ==========================================

//   const [errors, setErrors] = useState({});

//   const [serverError, setServerError] = useState("");

//   const [loading, setLoading] = useState(false);


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


//     // Clear server error
//     setServerError("");
//   };


//   // ==========================================
//   // Handle Submit
//   // ==========================================

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Clear old messages
//     setErrors({});
//     setServerError("");


//     // ========================================
//     // Frontend Validation
//     // ========================================

//     const validationResult = validateForm(
//       loginSchema,
//       formData
//     );

//     if (!validationResult.isValid) {
//       setErrors(validationResult.errors);
//       return;
//     }


//     // ========================================
//     // Login API
//     // ========================================

//     try {
//       setLoading(true);

//       const response = await loginUser(
//         validationResult.data
//       );


//       // ======================================
//       // Login Success
//       // ======================================

//       console.log(
//         "Login successful:",
//         response
//       );

//       // Go to dashboard
//       navigate("/");

//     } catch (error) {

//       console.error(
//         "Login error:",
//         error
//       );

//       // Backend error message
//       const message =
//         error.response?.data?.message ||
//         "Login failed. Please try again.";

//       setServerError(message);

//     } finally {
//       setLoading(false);
//     }
//   };


//   // ==========================================
//   // Go To Register
//   // ==========================================

//   const handleRegister = () => {
//     navigate("/register");
//   };


//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

//       <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">

//         <div className="w-full rounded-2xl bg-white p-5 shadow-sm sm:p-8">


//           {/* ======================================
//               Header
//           ====================================== */}

//           <div className="mb-7 sm:mb-8">

//             <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
//               Welcome back
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               Login to your Kroyshala account to continue.
//             </p>

//           </div>


//           {/* ======================================
//               Server Error
//           ====================================== */}

//           {serverError && (
//             <div className="mb-6">

//               <Alert
//                 variant="error"
//                 title="Login failed"
//                 fullWidth
//               >
//                 {serverError}
//               </Alert>

//             </div>
//           )}


//           {/* ======================================
//               Login Form
//           ====================================== */}

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >

//             {/* Email */}

//             <Input
//               type="email"
//               name="email"
//               label="Email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               errorMessage={errors.email}
//               required
//               disabled={loading}
//               fullWidth
//             />


//             {/* Password */}

//             <Input
//               type="password"
//               name="password"
//               label="Password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               errorMessage={errors.password}
//               passwordToggle
//               required
//               disabled={loading}
//               fullWidth
//             />
//             {/* Forgot Password */}

//             <div className="flex justify-end">
//               <Link
//               to="/forgot-password"
//                className="
//                text-sm
//                font-medium
//                text-blue-600
//                transition-colors
//                hover:text-blue-700
//                hover:underline
//             "
//               >
//                 Forgot password?
//               </Link>
//             </div>


//             {/* Submit Button */}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full"
//             >
//               {loading
//                 ? "Logging in..."
//                 : "Login"}
//             </Button>

//           </form>


//           {/* ======================================
//               Register
//           ====================================== */}

//           <div className="mt-6 text-center text-sm text-slate-500">

//             Don't have an account?{" "}

//             <button
//               type="button"
//               onClick={handleRegister}
//               disabled={loading}
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
//               Create an account
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };


// export default LoginPage;