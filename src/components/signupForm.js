import { useRef, useState} from "react"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../auth/authProvider";
import { useNavigate } from "react-router-dom";
export default function SignUpForm() {

    const [serverError, setServerError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const dateInputRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            emailAddress: '',
            password: '',
            name: '',
            dob: '',
            timezone:''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            emailAddress: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .matches(
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    'Password must contain at least one numeric value, one special character, one uppercase letter, one lowercase letter, and at least 8 characters'
                ),

            name: Yup.string().required('Name is required'),
            dob: Yup.date().required('Date of Birth is required'),
            timezone: Yup.string().required('Date of Birth is required'),
        }),
        onSubmit: async (values) => {
            const formattedValues = {
                ...values,
                dob: new Date(values.dob).toISOString().split('T')[0]
            };

            const error = await auth.signupAction(formattedValues);
            if (error) {
                // Parse the error string into a JSON object
                let parsedError;
                try {
                    parsedError = JSON.parse(error);
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                    setServerError('An unexpected error occurred');
                    return;
                }
            
                setServerError(parsedError);
                
            } else {
                setServerError('');
            }
        }
    });




    const handleContainerClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

    return (
        <form className="sm:h-full  signup flex   justify-between flex-wrap w-full" onSubmit={formik.handleSubmit}>
            <div className="sm:w-[48%] w-full flex flex-col h-fit items-start content-start">
                <div className="signup-input h-fit border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full mt-6 flex items-center sm:rounded-none rounded-md">
                    <PersonIcon className=" text-white "></PersonIcon>
                    <input

                        type="text"
                        placeholder="Name"
                        className="w-full  pl-2  bg-transparent text-white "
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />

                </div>
                {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-xs ">{formik.errors.name}</div>
                ) : null}
            </div>



            <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start">
                <div className="signup-input h-fit relative border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full sm:mt-6 mt-2 flex items-center sm:rounded-none rounded-md">
                    <PersonIcon className=" text-white "></PersonIcon>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full  h-fit pl-2  bg-transparent text-white"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />

                </div>
                {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-xs">{formik.errors.username}</div>
                ) : null}
                {
                    serverError && serverError[0].code==="DuplicateUserName"? <div className="text-red-500 text-xs">{serverError[0].description}</div>:null
                }
            </div>

            <div className=" sm:w-[48%] w-full flex flex-col">
            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full mt-2 flex items-center sm:rounded-none rounded-md">
                <EmailIcon className=" text-white "></EmailIcon>
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full  pl-2  bg-transparent text-white"
                    name="emailAddress"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.emailAddress}
                />
                
            </div>
            {formik.touched.emailAddress && formik.errors.emailAddress ? (
                    <div className="text-red-500 text-xs ">{formik.errors.emailAddress}</div>
                ) : null}
            </div>

            <div className=" sm:w-[48%] w-full flex flex-col">
            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full mt-2 flex items-center sm:rounded-none rounded-md">
                <PasswordIcon className=" text-white "></PasswordIcon>
                <input
                    type="text"
                    placeholder="Password"
                    className="w-full  pl-2  bg-transparent text-white"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                
            </div>
            {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-xs">{formik.errors.password}</div>
                ) : null}
            </div>

            <div className=" sm:w-[48%] w-full flex flex-col">
            <div onClick={handleContainerClick} className="signup-input  relative border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full mt-2 flex items-center sm:rounded-none rounded-md">
                <CalendarMonthIcon onClick={handleContainerClick} className=" text-white cursor-pointer"></CalendarMonthIcon>
                <input

                    ref={dateInputRef}
                    type="text"
                    placeholder="Date of Birth"
                    className="w-full pl-2 border-white bg-transparent text-white"
                    name="dob"
                    // value={input.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dob}
                />
                
            </div>
            {formik.touched.dob && formik.errors.dob ? (
                    <div className="text-red-500 text-xs ">{formik.errors.dob}</div>
                ) : null}
            </div>

            <div className=" sm:w-[48%] w-full flex flex-col">
            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full mt-2 flex items-center sm:rounded-none rounded-md">
                <AccessTimeIcon className=" text-white "></AccessTimeIcon>
                <input
                
                    type="text"
                    placeholder="Timezone"
                    className="w-full  pl-2  bg-transparent text-white"
                    name="timezone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.timezone}
                />
                
            </div>
            
            </div>

            <p className="text-xs mt-4   text-[#ffffff4d] w-full">
                By signing up, you agree to our Terms of Service and Privacy Policy. Please ensure that the information provided is accurate and up to date.
            </p>

            <p className="text-base mt-4   text-[#ffffff4d] text-center w-full">
                Already Have an Account? <span onClick={()=>navigate("/login")} className="text-white">Login</span>
            </p>
            <div className="w-full flex   justify-center mt-6">
                <button type="submit" className="text-white text-xl sm:w-fit w-full sm:p-1 p-2 px-6 sm:bg-[#8758ff] bg-[#1A1A40]">Create Account</button>

            </div>

        </form>

    )
}