'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import NavTopUser from './NavTopUser';

const Navbar = () => {
    const { data, isPending } = authClient.useSession();
    const { user } = data || {};

    return (
        <div className='flex items-center justify-between bg-white p-4 shadow-md mb-10'>
            <ul className='flex items-center gap-4'>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/destinations'}>Destinations</Link>
                </li>
                <li>
                    <Link href={'/add-destination'}>Add Destination</Link>
                </li>
                <li>
                    <Link href={'/my-bookings'}>My Bookings</Link>
                </li>
            </ul>

            <div>
                <Image src={'/assets/Wanderlast.png'} width={100} height={100} alt='wanderlust logo'></Image>
            </div>

            {isPending ? <p>Loading...</p> : user ? <NavTopUser user={user} /> : 
            <ul className='flex items-center gap-4'>
                <li>
                    <Link href={'/profile'}>Profile</Link>
                </li>
                <li>
                    <Link href={'/login'}>Login</Link>
                </li>
                <li>
                    <Link href={'/signup'}>Signup</Link>
                </li>
            </ul>}
        </div>
    );
};

export default Navbar;