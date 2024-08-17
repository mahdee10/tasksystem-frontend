import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useAuth } from "../../auth/authProvider";
export default function ProfilePopup({ openProfilePopup, setOpenProfilePopup, imageSrc, setImageSrc }) {
    const [file, setFile] = useState(null);
    const { token } = useAuth();
    const [error, setError] = useState(null);
    const [noEdit, setNoEdit] = useState(true);

    const [uploudedImage, setUploudedImage] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploudedImage(reader.result);// Set the base64 string for preview
            };
            reader.readAsDataURL(selectedFile); // Convert the file to base64

            setNoEdit(false);
                }
    };

    const handleClick = () => {
        document.getElementById('fileInput').click(); // Programmatically click the hidden input
    };

    const handleUpload = async () => {
        // if (!file) {
        //     alert('Please select a file first.');
        //     return;
        // }

        const formData = new FormData();
        formData.append('files', file); // Append the file to FormData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        try {

            const response = await fetch('https://localhost:7152/api/Profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add token to headers
                },
                body: formData, // Send FormData as body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setNoEdit(true);
            setImageSrc(uploudedImage);
            setOpenProfilePopup(false);

            const result = await response.json(); // Parse the JSON response
            console.log('Upload successful:', result);

        } catch (err) {
            console.error('Upload failed:', err);
            setError('Upload failed. Please try again.');

        }
    };

    return (
        <Dialog open={openProfilePopup} onClose={() => setOpenProfilePopup(false)} className="relative z-50 ">

            <div className="fixed inset-0 flex w-screen sm:flex-row flex-col items-center justify-center sm:p-4 backdrop-blur-md ">
                <DialogPanel className="relative max-w-lg sm:w-1/2 w-full sm:h-fit h-full space-y-4 border  bg-[#1A1A40]  rounded sm:border-solid border-white border-none sm:block flex flex-col justify-between">

                    <DialogTitle className="font-bold text-[#c69320] sm:text-2xl text-xl flex items-center justify-between p-4">
                        <span className=" self-center place-self-center justify-self-center">Profile Photo</span>
                        <span>
                            <CloseIcon onClick={() => setOpenProfilePopup(false)} className="cursor-pointer  text-white mt-[-10px]"></CloseIcon>

                        </span>
                    </DialogTitle>

                    <div className="w-full flex justify-center px-4 py-2">
                        <img className="ml-2 sm:w-64 sm:h-64  rounded-full cursor-pointer" src={noEdit?imageSrc:uploudedImage} alt="Profile" />

                    </div>

                    <div className="w-full flex justify-between border-t-2 border-white px-4 py-2 mt-5">
                        <div onClick={() => handleClick()} className="flex flex-col  justify-center items-center cursor-pointer">
                            <EditIcon className="cursor-pointer  text-white "></EditIcon>
                            <p className="text-white">Edit Photo</p>
                        </div>
                        {
                            !noEdit&&
                            <div onClick={() => handleUpload()} className="flex flex-col  justify-center items-center cursor-pointer">
                                <EditIcon className="cursor-pointer  text-white "></EditIcon>
                                <p className="text-white">Confirm Update</p>
                            </div>
                        }
                        <div className="flex flex-col  justify-center items-center cursor-pointer">
                            <DeleteIcon className="  text-white "></DeleteIcon>
                            <p className="text-white">Delete Photo</p>
                        </div>
                    </div>

                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />


                </DialogPanel>
            </div>
        </Dialog>
    )
}