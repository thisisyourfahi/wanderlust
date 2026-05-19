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
    const data = await res.json();

    return (
        <div className='space-y-8'>
            <div>
                <h2 className='text-2xl font-bold'>My Bookings</h2>
                <p className='text-muted'>Manage and view your upcoming travel plans.</p>
            </div>

            <div className='space-y-8'>
                {
                    data.length > 0 ? <>
                        {
                            data.map(d => <BookedCards key={d._id} bookingInfo={d}/>)
                        }
                    </> : <>
                        <h2>You don&apos;t have any booking at this moment.</h2>
                    </>
                }
            </div>
        </div>
    );
};

export default MyBookingPage;