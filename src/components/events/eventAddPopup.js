import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TitleIcon from '@mui/icons-material/Title';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef} from 'react';
import { useAuth } from '../../auth/authProvider';
import { useEvent } from '../../context/eventContext';
import EventAddInput from './eventAddInput';

export default function EventAddPopup({ openEventPopup, setOpenEventPopup }) {

    const dateInputRef = useRef(null);
    const { token } = useAuth();
    const { setEvents } = useEvent()

    // Function to add a new event
    const addEvent = async (newEvent) => {
        try {
            const response = await fetch("https://localhost:7152/api/Event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Update the state with the new event
            setEvents((prevEvents) => [...prevEvents, data]);
            setOpenEventPopup(false)
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            date: '',
            remindBeforeHours: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string()
                .required('Description is required'),
            date: Yup.date()
                .required('Date and time are required')
                .min(new Date(), 'Date and time must be in the future'),
            remindBeforeHours: Yup.number()
                .typeError('remindBeforeHours must be a number')
                .required('remindBeforeHours is required')
                .moreThan(0, 'remindBeforeHours must be greater than 0'),
        }),
        onSubmit: async (values) => {
            addEvent(values)
        }
    });
    const handleContainerClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };


    return (
        <Dialog open={openEventPopup} onClose={() => setOpenEventPopup(false)} className="relative z-50 ">

            <div className="fixed inset-0 flex w-screen items-center justify-center sm:p-4 backdrop-blur-md 
            ">
                <DialogPanel className="relative max-w-lg space-y-4 border  bg-[#1A1A40] p-12 rounded sm:border-solid border-white border-none">
                    <CloseIcon onClick={() => setOpenEventPopup(false)} className="cursor-pointer absolute text-white right-5 top-5"></CloseIcon>

                    <DialogTitle className="font-bold text-[#c69320] sm:text-3xl text-xl text-center ">Add Event</DialogTitle>
                    <form className="sm:h-full  signup flex   justify-between flex-wrap w-full" onSubmit={formik.handleSubmit}>

                        <EventAddInput
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
                        </EventAddInput>

                        <EventAddInput
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
                        </EventAddInput>



                        

                        <div className=" sm:w-[48%] w-full flex flex-col h-fit items-start content-start">
                            <h4 className="text-sm font-bold text-[#ffffff4d] ">Date</h4>

                            <div onClick={() => { handleContainerClick() }} className="signup-input h-fit relative border-2 p-1 border-[#8758ff]  w-full  flex items-center sm:rounded-none rounded-md">
                                <DateRangeIcon className=" text-white "></DateRangeIcon>
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

                        <EventAddInput
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
                        </EventAddInput>

                    

                        <div className="w-full flex   justify-center mt-6">
                            <button type="submit" className="text-white text-base sm:w-fit w-full sm:p-1 p-2 px-6  bg-[#8758ff]">Add Event</button>

                        </div>

                    </form>
                </DialogPanel>
            </div>
        </Dialog>

    )
}