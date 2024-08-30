import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { useTask } from '../../context/taskContext';
import { useAuth } from '../../auth/authProvider';
import TaskDeletePopup from './taskDeletePopup';

export default function TaskEditPopup({ openTaskEditPopup, setOpenTaskEditPopup, task, setTitle }) {

    const dateInputRef = useRef(null);
    const { token } = useAuth();
    const { setTasks, tasks } = useTask();

    const [openTaskDeletePopup,setOpenTaskDeletePopup]=useState(false);


    const editTask = async (updatedTask) => {
        try {
            console.log(updatedTask)
            const response = await fetch(`https://localhost:7152/api/Task/${task.taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Update the state with the edited task


            setTasks((prevTasks) =>
                prevTasks.map((tasky) => (tasky.taskId === task.taskId ? data : tasky))
            );

            setTitle("")
            setOpenTaskEditPopup(false);
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };


    const formik = useFormik({
        initialValues: {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            remindBeforeHours: task.isReminded ? null : task.remindBeforeHours,
            priorityLevel: task.priorityLevel,
            isDone: task.isDone
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string()
                .required('Description is required'),
            dueDate: Yup.date()
                .required('Date and time are required'),
            // .min(new Date(), 'Date and time must be in the future'),
            priorityLevel: Yup.string().required('Priority is required'),
            // remindBeforeHours: Yup.number()
            // .typeError('remindBeforeHours must be a number')
            // .required('remindBeforeHours is required')
            // .moreThan(0, 'remindBeforeHours must be greater than 0'),
        }),
        onSubmit: async (values) => {
            console.log(values, "sdf")
            editTask(values)
        }
    });
    const handleContainerClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };


    return (
        <Dialog open={openTaskEditPopup} onClose={() => setOpenTaskEditPopup(false)} className="relative z-50 ">

            <div className="fixed inset-0 flex w-screen items-center justify-center sm:p-4 backdrop-blur-md 
            ">
                <DialogPanel className="relative max-w-lg space-y-4 border  bg-[#1A1A40] p-12 rounded sm:border-solid border-white border-none">
                    { !openTaskDeletePopup&&
                    <CloseIcon  onClick={() => setOpenTaskEditPopup(false)} className="cursor-pointer absolute text-white right-5 top-5"></CloseIcon>
                    }
                    <TaskDeletePopup setOpenTaskEditPopup={setOpenTaskEditPopup} openTaskDeletePopup={openTaskDeletePopup} task={task} setOpenTaskDeletePopup={setOpenTaskDeletePopup}></TaskDeletePopup>

                    <DialogTitle className="font-bold text-[#c69320] sm:text-3xl text-xl text-center ">Edit Task</DialogTitle>
                    <form className="sm:h-full  signup flex   justify-between flex-wrap w-full" onSubmit={formik.handleSubmit}>
                        <div className="sm:w-[48%] w-full flex flex-col h-fit items-start content-start">
                            <h4 className="text-sm font-bold text-[#ffffff4d] ">Title</h4>
                            <div className="signup-input h-fit border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full  flex items-center sm:rounded-none rounded-md">
                                <PersonIcon className=" text-white "></PersonIcon>
                                <input

                                    type="text"
                                    placeholder="Title"
                                    className="w-full  pl-2  bg-transparent text-white "
                                    name="title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />

                            </div>
                            {formik.touched.title && formik.errors.title ? (
                                <div className="text-red-500 text-xs ">{formik.errors.title}</div>
                            ) : null}
                        </div>



                        <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start ">
                            <h4 className="text-sm font-bold text-[#ffffff4d] ">Description</h4>
                            <div className="signup-input h-fit relative border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full  flex items-center sm:rounded-none rounded-md">
                                <PersonIcon className=" text-white "></PersonIcon>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="w-full  h-fit pl-2  bg-transparent text-white"
                                    name="description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />

                            </div>
                            {formik.touched.description && formik.errors.description ? (
                                <div className="text-red-500 text-xs">{formik.errors.description}</div>
                            ) : null}
                            {/* {
                                serverError && serverError[0].code === "DuplicateUserName" ? <div className="text-red-500 text-xs">{serverError[0].description}</div> : null
                            } */}
                        </div>

                        <div className=" sm:w-[48%] w-full flex flex-col">
                            <h4 className="text-sm font-bold text-[#ffffff4d] mt-2">Due Date</h4>
                            <div onClick={() => { handleContainerClick() }} className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full flex items-center sm:rounded-none rounded-md">
                                <EmailIcon className=" text-white "></EmailIcon>
                                <input
                                    ref={dateInputRef}
                                    type="datetime-local"
                                    placeholder="DueDate"
                                    className="w-full  pl-2  bg-transparent text-white"
                                    name="duedate"
                                    onChange={(e) => {
                                        formik.setFieldValue('dueDate', e.target.value);
                                        console.log(formik.values.dueDate);
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dueDate}
                                // onChange={(e)=>{handleDateChange(e)}}
                                />



                            </div>
                            {formik.touched.dueDate && formik.errors.dueDate ? (
                                <div className="text-red-500 text-xs ">{formik.errors.dueDate}</div>
                            ) : null}
                        </div>

                        <div className=" sm:w-[48%] w-full flex flex-col">
                            <h4 className="text-sm font-bold text-[#ffffff4d] mt-2">RemidBeforeHours</h4>
                            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full  flex items-center sm:rounded-none rounded-md">
                                <PasswordIcon className=" text-white "></PasswordIcon>
                                <input
                                    type="text"
                                    placeholder={task.isReminded ? "Already Reminded" : "Remind Before Hours"}
                                    className="w-full  pl-2  bg-transparent text-white"
                                    name="remindBeforeHours"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.remindBeforeHours}
                                    readOnly={task.isReminded ? true : false}
                                />

                            </div>
                            {formik.touched.remindBeforeHours && formik.errors.remindBeforeHours ? (
                                <div className="text-red-500 text-xs">{formik.errors.remindBeforeHours}</div>
                            ) : null}
                        </div>
                        <div className=" sm:w-[48%] w-full flex flex-col">
                            <h4 className="text-sm font-bold text-[#ffffff4d] mt-2">Priority</h4>
                            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full  flex items-center sm:rounded-none rounded-md">
                                <PasswordIcon className=" text-white "></PasswordIcon>
                                <select
                                    placeholder="Priority"
                                    className="w-full p-0 select priority-select  bg-[#1A1A40] border-none focus:border-none text-white"
                                    name="priorityLevel"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.priorityLevel}
                                    aria-label="Project status">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>

                            </div>
                            {formik.touched.priorityLevel && formik.errors.priorityLevel ? (
                                <div className="text-red-500 text-xs">{formik.errors.priorityLevel}</div>
                            ) : null}
                        </div>

                        <div className=" sm:w-[48%] w-full flex flex-col">
                            <h4 className="text-sm font-bold text-[#ffffff4d] mt-2">Status</h4>
                            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full  flex items-center sm:rounded-none rounded-md">
                                <PasswordIcon className=" text-white "></PasswordIcon>
                                <select
                                    placeholder="Status"
                                    className="w-full p-0 select priority-select  bg-[#1A1A40] border-none focus:border-none text-white"
                                    name="isDone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.isDone}
                                    aria-label="Project status">
                                    <option value={true}>Done</option>
                                    <option value={false}>Not Done</option>

                                </select>

                            </div>
                            {formik.touched.isDone && formik.errors.isDone ? (
                                <div className="text-red-500 text-xs">{formik.errors.isDone}</div>
                            ) : null}
                        </div>








                        <div className="w-full flex   justify-center mt-6">
                            <button type="submit" className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6  bg-[#8758ff] mr-1">Edit Task</button>
                            <div onClick={()=>{setOpenTaskDeletePopup(true)}} className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6   bg-red-600 cursor-pointer">Delete Task</div>

                        </div>

                    </form>
                </DialogPanel>
            </div>
        </Dialog>

    )
}