'use client'
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";
import { FaTrash } from "react-icons/fa";

const DeleteModal = ({ destination, deleteBooking, bookingInfo }) => {

    const handleDelete = async () => {
        // if (deleteBooking) {
        //     // hit delete booking url 
        //     console.log('delete booking:', bookingInfo)
        //     const res = await fetch(`http://localhost:5000/my-bookings/delete/${bookingInfo._id}`, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(bookingInfo)
        //     })
        //     const result = await res.json();
        //     if (result) {
        //         alert('Booking Cancelled');
        //         redirect('/my-bookings')
        //     }
        //     console.log('delete booking respons from server:', result);
        //     return ;
        // }

        const res = await fetch(`http://localhost:5000/destinations/${destination._id}`, {
            method: 'DELETE'
        });
        const result = await res.json();
        console.log('Delete result from server:', result);
        if (result.acknowledged) {
            alert(`Destination "${destination.destinationName}" has been deleted.`);
            redirect('/destinations');
        }
    }

    return (
        <AlertDialog>
            <Button size="sm" variant="danger" className={'rounded-none'}><FaTrash />Delete</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100 rounded-none">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete <strong>{destination.destinationName}</strong>?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{destination.destinationName}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button className={'rounded-none'} slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} className={'rounded-none'} slot="close" variant="danger">
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteModal;