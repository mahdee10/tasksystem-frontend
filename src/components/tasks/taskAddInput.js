export default function TaskAddInput({ title, children, icon,error }) {
    return (
        <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start mb-2">
            <h4 className="text-sm font-bold text-[#ffffff4d] ">{title}</h4>
            <div className="signup-input h-fit relative border-2 p-1 border-[#8758ff]  w-full  flex items-center sm:rounded-none rounded-md">
                {icon}
                {children}
            </div>
            {error}
        </div>
    )
}