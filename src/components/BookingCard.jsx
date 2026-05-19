'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Card, AlertDialog } from '@heroui/react';
import { redirect } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import { TiTickOutline } from 'react-icons/ti';

const BookingCard = ({ d }) => {
    const { price, departureDate, _id } = d;
    const { data } = authClient.useSession();
    const user = data?.user;

    const handleBooking = async () => {
        const bookingData = {
            userID: user?.id,
            destinationID: _id,
            date: new Date()
        }

        const { data: response, error } = await fetch(`http://localhost:5000/destinations/${_id}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        if (data) {
            alert('Trip Booked Successfully. Thank you for choosing Wanderlust!')
            redirect('/destinations')
        }
    }
    return (
        <Card className='border rounded-none min-w-100'>
            <div>
                <p className='text-muted'>Starting From</p>
                <p className='text-2xl text-cyan-500 font-bold'>${price}</p>
                <p className='text-muted'>Per Person</p>
            </div>
            <p className='border px-8 py-1'>{departureDate}</p>
            <AlertDialog>
                <Button className={'bg-cyan-500 rounded-none w-full'}>Book Now <TiTickOutline /></Button>
                <AlertDialog.Backdrop className={'rounded-none'}>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className='rounded-none'>
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Heading>
                                    Confirm your booking?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Footer>
                                <Button className={'rounded-none'} variant='tertiary' slot={'close'} >
                                    Cancel
                                </Button>
                                <Button onClick={handleBooking} className={'rounded-none bg-cyan-500'} variant='primary'>
                                    Confirm Booking
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
            <ul className='list-disc list-inside mt-4 space-y-1 text-sm text-muted'>
                <li>Free cancellation</li>
                <li>24/7 customer support</li>
                <li>Best price guarantee</li>
            </ul>
        </Card>
    );
};

export default BookingCard;