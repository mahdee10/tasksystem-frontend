import LoginForm from "../components/loginForm";

export default function Login(){
    return(
    <div className="flex justify-center  items-center h-screen">
            <div className="md:w-[30%] sm:w-[50%] sm:h-[60%] h-[80%] w-full sm:bg-[#1A1A40] sm:p-8 p-5 ">
              <h2 className="text-white text-center text-3xl ">Login</h2>
              <LoginForm></LoginForm>
            </div>
        </div>
    )
}