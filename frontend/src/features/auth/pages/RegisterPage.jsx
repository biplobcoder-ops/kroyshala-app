// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Input from "../../../components/ui/Input/Input";
// import Button from "../../../components/ui/Button/Button";
// import Alert from "../../../components/ui/Alert/Alert";

// import { registerSchema } from "../schemas/registerSchema";
// import { registerUser } from "../services/authApi";

// import validateForm  from "../../../utils/validateForm";


// const RegisterPage = () => {
//   const navigate = useNavigate();

//   // ============================================
//   // Form Data
//   // ============================================

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",

//     address: {
//       street: "",
//       city: "",
//       postalCode: "",
//       country: "Bangladesh",
//     },
//   });


//   // ============================================
//   // Form State
//   // ============================================

//   const [errors, setErrors] = useState({});

//   const [serverError, setServerError] = useState("");

//   const [successMessage, setSuccessMessage] = useState("");

//   const [loading, setLoading] = useState(false);


//   // ============================================
//   // Address Fields
//   // ============================================

//   const filterFields = [
//     "street",
//     "city",
//     "postalCode",
//     "country",
//   ];


//   // ============================================
//   // Handle Change
//   // ============================================
// const handleChange = (event) => {
//   const { name, value } = event.target;

//   if (filterFields.includes(name)) {
//     setFormData((previousData) => ({
//       ...previousData,
//       address: {
//         ...previousData.address,
//         [name]: value,
//       },
//     }));
//   } else {
//     setFormData((previousData) => ({
//       ...previousData,
//       [name]: value,
//     }));
//   }

//   setServerError("");
//   setSuccessMessage("");
// };


//   // ============================================
//   // Handle Submit
//   // ============================================
// const handleSubmit = async (event) => {
//   event.preventDefault();

//   setErrors({});
//   setServerError("");
//   setSuccessMessage("");

//   const validationResult = validateForm(
//     registerSchema,
//     formData
//   );


//   if (!validationResult.isValid) {
//     setErrors(validationResult.errors);
//     return;
//   }

//   try {
//     setLoading(true);

//     const {
//       confirmPassword,
//       ...userData
//     } = formData;

//     const response = await registerUser(userData);

//     setSuccessMessage(
//       response.message
//     );

//     navigate(
//       `/verify-email?email=${encodeURIComponent(
//         formData.email
//       )}`
//     );

//   } catch (error) {
     

//     setServerError(
//       error.response?.data?.message ||
//         "Registration failed. Please try again."
//     );
//   } finally {
//     setLoading(false);
//   }
// };


//   // ============================================
//   // Go To Login
//   // ============================================

//   const handleLogin = () => {
//     navigate("/login");
//   };


//   // ============================================
//   // UI
//   // ============================================

//   return (
//     <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

//       <div className="mx-auto w-full max-w-2xl">

//         <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">


//           {/* ======================================
//               Header
//           ====================================== */}

//           <div className="mb-7 sm:mb-8">

//             <h1 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
//               Create your account
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
//               Create your Kroyshala account to continue shopping.
//             </p>

//           </div>


//           {/* ======================================
//               Server Error
//           ====================================== */}

//           {serverError && (
//             <div className="mb-6">

//               <Alert
//                 variant="error"
//                 title="Registration failed"
//                 message={serverError}
//               />

//             </div>
//           )}


//           {/* ======================================
//               Success Message
//           ====================================== */}

//           {successMessage && (
//             <div className="mb-6">

//               <Alert
//                 variant="success"
//                 title="Registration successful"
//                 message={successMessage}
//               />

//             </div>
//           )}


//           {/* ======================================
//               Form
//           ====================================== */}

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-6"
//           >


//             {/* ====================================
//                 Personal Information
//             ==================================== */}

//             <div className="space-y-5">

//               <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
//                 Personal Information
//               </h2>


//               {/* Name */}
 
//               <Input
//                 name="name"
//                 label="Full Name"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 errorMessage={errors.name}
//                 required
//                 disabled={loading}
//                 fullWidth
//               />


//               {/* Email */}

//               <Input
//                 type="email"
//                 name="email"
//                 label="Email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 errorMessage={errors.email}
//                 required
//                 disabled={loading}
//                 fullWidth
//               />


//               {/* Phone */}

//               <Input
//                 name="phone"
//                 label="Phone"
//                 placeholder="01XXXXXXXXX"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 errorMessage={errors.phone}
//                 required
//                 disabled={loading}
//                 fullWidth
//               />

//             </div>


//             {/* ====================================
//                 Password
//             ==================================== */}

//             <div className="space-y-5">

//               <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
//                 Security
//               </h2>


//               {/* Password */}

//               <Input
//                 type="password"
//                 name="password"
//                 label="Password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 errorMessage={errors.password}
//                 passwordToggle
//                 required
//                 disabled={loading}
//                 fullWidth
//               />


//               {/* Confirm Password */}

//               <Input
//                 type="password"
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 errorMessage={errors.confirmPassword}
//                 passwordToggle
//                 required
//                 disabled={loading}
//                 fullWidth
//               />

//             </div>


//             {/* ====================================
//                 Address
//             ==================================== */}

//             <div className="space-y-5">

//               <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
//                 Address
//               </h2>


//               {/* Street */}

//               <Input
//                 name="street"
//                 label="Street"
//                 placeholder="Street address"
//                 value={formData.address.street}
//                 onChange={handleChange}
//                 errorMessage={errors.address?.street}
//                 disabled={loading}
//                 fullWidth
//               />


//               {/* City + Postal Code */}

//               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

//                 <Input
//                   name="city"
//                   label="City"
//                   placeholder="City"
//                   value={formData.address.city}
//                   onChange={handleChange}
//                   errorMessage={errors.address?.city}
//                   disabled={loading}
//                   fullWidth
//                 />


//                 <Input
//                   name="postalCode"
//                   label="Postal Code"
//                   placeholder="Postal code"
//                   value={formData.address.postalCode}
//                   onChange={handleChange}
//                   errorMessage={errors.address?.postalCode}
//                   disabled={loading}
//                   fullWidth
//                 />

//               </div>


//               {/* Country */}

//               <Input
//                 name="country"
//                 label="Country"
//                 placeholder="Country"
//                 value={formData.address.country}
//                 onChange={handleChange}
//                 errorMessage={errors.address?.country}
//                 disabled={loading}
//                 fullWidth
//               />

//             </div>


//             {/* ====================================
//                 Submit Button
//             ==================================== */}

//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full"
//             >
//               {loading
//                 ? "Creating account..."
//                 : "Create Account"}
//             </Button>

//           </form>


//           {/* ======================================
//               Login
//           ====================================== */}

//           <div className="mt-6 text-center text-sm text-slate-500">

//             Already have an account?{" "}

//             <button
//               type="button"
//               onClick={handleLogin}
//               disabled={loading}
//               className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Login
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };


// export default RegisterPage;