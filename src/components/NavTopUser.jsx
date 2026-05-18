import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const NavTopUser = ({ user }) => {
    const handleLogout = async () => {
        await authClient.signOut();
        alert("Logged out successfully!");
    }
    return (
        <div className='flex items-center gap-2'>
            <Link href={'/profile'}>
                <Avatar >
                    <Avatar.Image className='object-cover' src={user?.image} alt={user?.name} referrerPolicy="no-referrer" />
                    <Avatar.Fallback className='text-2xl'>{user?.name[0]}</Avatar.Fallback>
                </Avatar>
            </Link>
            <Button onClick={handleLogout} size='sm' variant='danger' className={'rounded-sm'}>
                Logout
            </Button>
        </div>
    );
};

export default NavTopUser;