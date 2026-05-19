import React from 'react';
import BookedCards from './BookedCards';
import { authClient } from '@/lib/auth-client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import BookingCard from '@/components/BookingCard';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userId = session?.user?.id;
    const res = await fetch(`http://localhost:5000/my-bookings/${userId}`)
    const bookings = await res.json();

    console.log('users bookings:', bookings)

    return (
        <div className='space-y-8'>
            <div>
                <h2 className='text-2xl font-bold'>My Bookings</h2>
                <p className='text-muted'>Manage and view your upcoming travel plans.</p>
            </div>

            <div className='space-y-8'>
                {
                    bookings.length > 0 ? <>
                        {
                            bookings.map(booking => <BookedCards key={booking._id} bookingInfo={booking}/>)
                        }
                    </> : <>
                        <h2 className='text-center pt-60 pb-60 border'>You don&apos;t have any booking at this moment.</h2>
                    </>
                }
            </div>
        </div>
    );
};

export default MyBookingPage;