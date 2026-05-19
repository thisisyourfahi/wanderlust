'use client'
import { AlertDialog, Button } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteBookingModal = ({deleteBookingId}) => {
    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/my-bookings/delete/${deleteBookingId}`, {
            method: 'DELETE'
        })
        const result = await res.json();
        if (result.acknowledged) {
            alert('Booking cancelled!');
            redirect('/my-bookings');
        }
        
    }
    return (
        <AlertDialog>
            <Button size='sm' variant='danger-soft' className={'rounded-none w-full'}>Cancel <FaTrash /></Button>
            <AlertDialog.Backdrop className={'rounded-none'}>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className='rounded-none'>
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Heading>
                                Are you sure you want to canel your booking?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Footer>
                            <Button className={'rounded-none'} variant='tertiary' slot={'close'} >
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} className={'rounded-none'} variant='danger-soft'>
                                Delte Booking
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteBookingModal;