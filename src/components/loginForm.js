import {  useState} from "react"
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../auth/authProvider";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
    const [serverError, setServerError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

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
            password: Yup.string().required('Password is required')

        }),
        onSubmit: async (values) => {
            const error = await auth.loginAction(values);
            if (error) {
                console.log(error)
                setServerError(error);
                
            } else {
                setServerError('');
            }
        }
    });

    return (
        <form className="sm:h-[90%]  h-[65%]  signup flex  flex-col w-full" onSubmit={formik.handleSubmit}>




            <div className="  w-full flex flex-col h-fit items-start content-start">
                <div className="signup-input h-fit relative border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full sm:mt-6 mt-10 flex items-center sm:rounded-none rounded-md">
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



            <div className="w-full flex flex-col">
            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full  sm:mt-6 mt-2 flex items-center sm:rounded-none rounded-md">
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
                {
                    serverError ? <div className="text-red-500 text-xs">{serverError}</div>:null
                }
            </div>



            {/* <p className="text-xs mt-4   text-[#ffffff4d] w-full">
                By signing up, you agree to our Terms of Service and Privacy Policy. Please ensure that the information provided is accurate and up to date.
            </p> */}

            <p className="text-base mt-4   text-[#ffffff4d] text-center w-full">
                Do Not Have an Account? <span onClick={()=>navigate("/signup")} className="text-white">SignUp</span>
            </p>
            <div className="w-full flex items-end grow justify-self-end   justify-center mt-6">
                <button type="submit" className="text-white text-xl sm:w-fit w-full sm:px-10 p-2 px-6 sm:bg-[#8758ff] bg-[#1A1A40]">Login</button>

            </div>

        </form>

    )
}