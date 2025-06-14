import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TitleIcon from '@mui/icons-material/Title';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select } from '@mui/material';
import { useRef, useState } from 'react';
import { useTask } from '../../context/taskContext';
import { useAuth } from '../../auth/authProvider';
import TaskAddInput from './taskAddInput';

export default function TaskPopup({ openTaskPopup, setOpenTaskPopup }) {

    const dateInputRef = useRef(null);
    const { token } = useAuth();
    const { setTasks } = useTask()

    // Function to add a new task
    const addTask = async (newTask) => {
        try {
            const response = await fetch("https://tasksystem-backend.onrender.com/api/Task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Update the state with the new task
            setTasks((prevTasks) => [...prevTasks, data]);
            setOpenTaskPopup(false)
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            dueDate: '',
            remindBeforeHours: '',
            priorityLevel: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string()
                .required('Description is required'),
            dueDate: Yup.date()
                .required('Date and time are required')
                .min(new Date(), 'Date and time must be in the future'),
            priorityLevel: Yup.string().required('Priority is required'),
            remindBeforeHours: Yup.number()
                .typeError('remindBeforeHours must be a number')
                .required('remindBeforeHours is required')
                .moreThan(0, 'remindBeforeHours must be greater than 0'),
        }),
        onSubmit: async (values) => {
            addTask(values)
        }
    });
    const handleContainerClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };


    return (
        <Dialog open={openTaskPopup} onClose={() => setOpenTaskPopup(false)} className="relative z-50 ">

            <div className="fixed inset-0 flex w-screen items-center justify-center sm:p-4 backdrop-blur-md 
            ">
                <DialogPanel className="relative max-w-lg space-y-4 border  bg-[#1A1A40] p-12 rounded sm:border-solid border-white border-none">
                    <CloseIcon onClick={() => setOpenTaskPopup(false)} className="cursor-pointer absolute text-white right-5 top-5"></CloseIcon>

                    <DialogTitle className="font-bold text-[#c69320] sm:text-3xl text-xl text-center ">Add Task</DialogTitle>
                    <form className="sm:h-full  signup flex   justify-between flex-wrap w-full" onSubmit={formik.handleSubmit}>
                        {/* <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start ">
                            <h4 className="text-sm font-bold text-[#ffffff4d] ">Title</h4>
                            <div className="signup-input h-fit relative border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full  flex items-center sm:rounded-none rounded-md">
                                <TitleIcon className=" text-white "></TitleIcon>
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
                        </div> */}
                        <TaskAddInput
                            error={formik.touched.title && formik.errors.title ? (
                                <div className="text-red-500 text-xs ">{formik.errors.title}</div>
                            ) : null}
                            icon={<TitleIcon className=" text-white "></TitleIcon>}
                            title={"Title"}

                        >
                            <input

                                type="text"
                                placeholder="Title"
                                className="w-full  pl-2  bg-transparent text-white "
                                name="title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />
                        </TaskAddInput>

                        <TaskAddInput
                            error={formik.touched.description && formik.errors.description ? (
                                <div className="text-red-500 text-xs">{formik.errors.description}</div>
                            ) : null}
                            icon={<DescriptionIcon className=" text-white "></DescriptionIcon>}
                            title={"Description"}

                        >
                            <input
                                type="text"
                                placeholder="Description"
                                className="w-full  h-fit pl-2  bg-transparent text-white"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                        </TaskAddInput>



                        {/* <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start ">
                            <h4 className="text-sm font-bold text-[#ffffff4d] ">Description</h4>
                            <div className="signup-input h-fit relative border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full  flex items-center sm:rounded-none rounded-md">
                                <DescriptionIcon className=" text-white "></DescriptionIcon>
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
                            
                        </div> */}

                        <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start">
                            <h4 className="text-sm font-bold text-[#ffffff4d] ">Due Date</h4>

                            <div onClick={() => { handleContainerClick() }} className="signup-input h-fit relative border-2 p-1 border-[#8758ff]  w-full  flex items-center sm:rounded-none rounded-md">
                                <DateRangeIcon className=" text-white "></DateRangeIcon>
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

                        <TaskAddInput
                            error={formik.touched.remindBeforeHours && formik.errors.remindBeforeHours ? (
                                <div className="text-red-500 text-xs">{formik.errors.remindBeforeHours}</div>
                            ) : null}
                            icon={<NotificationsActiveIcon className=" text-white "></NotificationsActiveIcon>}
                            title={"Reminder"}

                        >
                            <input
                                type="text"
                                placeholder="Remind Before Hours"
                                className="w-full  pl-2  bg-transparent text-white"
                                name="remindBeforeHours"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.remindBeforeHours}
                            />
                        </TaskAddInput>

                        {/* <div className=" sm:w-[48%] w-full flex flex-col">
                            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full mt-2 flex items-center sm:rounded-none rounded-md">
                                <NotificationsActiveIcon className=" text-white "></NotificationsActiveIcon>
                                <input
                                    type="text"
                                    placeholder="Remind Before Hours"
                                    className="w-full  pl-2  bg-transparent text-white"
                                    name="remindBeforeHours"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.remindBeforeHours}
                                />

                            </div>
                            {formik.touched.remindBeforeHours && formik.errors.remindBeforeHours ? (
                                <div className="text-red-500 text-xs">{formik.errors.remindBeforeHours}</div>
                            ) : null}
                        </div> */}

                        <TaskAddInput
                            error={formik.touched.priorityLevel && formik.errors.priorityLevel ? (
                                <div className="text-red-500 text-xs">{formik.errors.priorityLevel}</div>
                            ) : null}
                            icon={<PriorityHighIcon className=" text-white "></PriorityHighIcon>}
                            title={"Priority"}

                        >
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
                        </TaskAddInput>
                        {/* <div className=" sm:w-[48%] w-full flex flex-col">
                            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full mt-2 flex items-center sm:rounded-none rounded-md">
                                <PriorityHighIcon className=" text-white "></PriorityHighIcon>
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
                        </div> */}








                        <div className="w-full flex   justify-center mt-6">
                            <button type="submit" className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6  bg-[#8758ff]">Add Task</button>

                        </div>

                    </form>
                </DialogPanel>
            </div>
        </Dialog>

    )
}