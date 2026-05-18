'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Card } from '@heroui/react';
const ProfilePage = () => {
    const {data, isPending} = authClient.useSession();
    const {user} = data || {};
    console.log(user);

    return (
        <div className="mt-10 space-y-8">
            <p className='animate__animated animate__bounce text-2xl font-bold text-center'>Welcome </p>

            <Card className="animate__bounceInUp animate__animated border border-gray-200 mx-auto md:w-125 py-10 mt-5">
                <Avatar className='w-40 h-40 rounded-full mx-auto'>
                    <Avatar.Image className='object-cover' src={user?.image} alt={user?.name} referrerPolicy="no-referrer" />
                    <Avatar.Fallback className='text-7xl'>{user?.name[0]}</Avatar.Fallback>
                </Avatar>
                <h2 className='text-3xl font-semibold text-center'>{user?.name}</h2>
                <p className='text-muted text-center'>{user?.email}</p>
            </Card>
                {/* <UpdateProfile /> */}
        </div>
    );
};

export default ProfilePage;