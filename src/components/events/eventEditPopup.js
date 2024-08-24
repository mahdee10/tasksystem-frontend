import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { useAuth } from '../../auth/authProvider';
import { useEvent } from '../../context/eventContext';
import EventDeletePopup from './eventDeletePopup';

export default function EventEditPopup({ openEventEditPopup, setOpenEventEditPopup, eventt }) {

    console.log(openEventEditPopup)
    const dateInputRef = useRef(null);
    const { token } = useAuth();
    const { setEvents, events } = useEvent();

    const [openEventDeletePopup,setOpenEventDeletePopup]=useState(false);


    const editEvent = async (updatedEvent) => {
        try {
            console.log(updatedEvent)
            const response = await fetch(`https://localhost:7152/api/Event/${eventt.eventId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(updatedEvent),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Update the state with the edited event


            setEvents((prevEvents) =>
                prevEvents.map((eventy) => (eventy.eventId === eventt.eventId ? data : eventy))
            );

            setOpenEventEditPopup(false);
        } catch (error) {
            console.error("Error editing event:", error);
        }
    };


    const formik = useFormik({
        initialValues: {
            title: eventt.title,
            description: eventt.description,
            date: eventt.date,
            remindBeforeHours: eventt.isReminded ? null : eventt.remindBeforeHours,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string()
                .required('Description is required'),
            date: Yup.date()
                .required('Date and time are required'),

        }),
        onSubmit: async (values) => {
            console.log(values, "sdf")
            editEvent(values)
        }
    });
    const handleContainerClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };


    return (
        <Dialog open={openEventEditPopup} onClose={() => setOpenEventEditPopup(false)} className="relative z-50 ">

            <div className="fixed inset-0 flex w-screen items-center justify-center sm:p-4 backdrop-blur-md 
            ">
                <DialogPanel className="relative max-w-lg space-y-4 border  bg-[#1A1A40] p-12 rounded sm:border-solid border-white border-none">
                    { !openEventDeletePopup&&
                    <CloseIcon  onClick={() => setOpenEventEditPopup(false)} className="cursor-pointer absolute text-white right-5 top-5"></CloseIcon>
                    }
                    <EventDeletePopup setOpenEventEditPopup={setOpenEventEditPopup} openEventDeletePopup={openEventDeletePopup} eventt={eventt} setOpenEventDeletePopup={setOpenEventDeletePopup}></EventDeletePopup>

                    <DialogTitle className="font-bold text-[#c69320] sm:text-3xl text-xl text-center ">Edit Event</DialogTitle>
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
                            <h4 className="text-sm font-bold text-[#ffffff4d] mt-2">Date</h4>
                            <div onClick={() => { handleContainerClick() }} className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40] w-full flex items-center sm:rounded-none rounded-md">
                                <EmailIcon className=" text-white "></EmailIcon>
                                <input
                                    ref={dateInputRef}
                                    type="datetime-local"
                                    placeholder="Date"
                                    className="w-full  pl-2  bg-transparent text-white"
                                    name="date"
                                    onChange={(e) => {
                                        formik.setFieldValue('date', e.target.value);
                                        console.log(formik.values.date);
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.date}
                                // onChange={(e)=>{handleDateChange(e)}}
                                />



                            </div>
                            {formik.touched.date && formik.errors.date ? (
                                <div className="text-red-500 text-xs ">{formik.errors.date}</div>
                            ) : null}
                        </div>

                        <div className=" sm:w-[48%] w-full flex flex-col">
                            <h4 className="text-sm font-bold text-[#ffffff4d] mt-2">RemidBeforeHours</h4>
                            <div className="signup-input relative  border-2 p-1 sm:border-[#8758ff] border-[#1A1A40]  w-full  flex items-center sm:rounded-none rounded-md">
                                <PasswordIcon className=" text-white "></PasswordIcon>
                                <input
                                    type="text"
                                    placeholder={eventt.isReminded ? "Already Reminded" : "Remind Before Hours"}
                                    className="w-full  pl-2  bg-transparent text-white"
                                    name="remindBeforeHours"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.remindBeforeHours}
                                    readOnly={eventt.isReminded ? true : false}
                                />

                            </div>
                            {formik.touched.remindBeforeHours && formik.errors.remindBeforeHours ? (
                                <div className="text-red-500 text-xs">{formik.errors.remindBeforeHours}</div>
                            ) : null}
                        </div>
                        

                        <div className="w-full flex   justify-center mt-6">
                            <button type="submit" className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6  bg-[#8758ff] mr-1">Edit Event</button>
                            <div onClick={()=>{setOpenEventDeletePopup(true)}} className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6   bg-red-600 cursor-pointer">Delete Event</div>

                        </div>

                    </form>
                </DialogPanel>
            </div>
        </Dialog>

    )
}