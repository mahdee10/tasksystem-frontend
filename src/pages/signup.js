import SignUpForm from "../components/signupForm";

export default function SignUp(){
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="sm:w-1/2 w-full sm:bg-[#1A1A40] p-5 ">
              <h2 className="text-white text-center text-3xl ">Sign Up</h2>
              <SignUpForm></SignUpForm>
            </div>
        </div>
    )
}