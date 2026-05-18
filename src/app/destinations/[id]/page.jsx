import DeleteModal from '@/components/DeleteModal';
import EditModal from '@/components/EditModal';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaArrowLeft, FaEdit, FaRegCalendarAlt } from 'react-icons/fa';

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/destinations/${id}`);

    const d = await res.json();
    return (
        <div className='border p-4 space-y-4 w-300 mx-auto'>
            <div className='flex justify-between items-center'>
                <Link href='/destinations' className='text-blue-500 flex items-center gap-1'><FaArrowLeft /> Back to all destinations</Link>
                <div className='flex items-center gap-2'>
                    <EditModal destination={d} />
                    <DeleteModal destination={d} />
                </div>
            </div>
            <h1 className='text-2xl'><span className='font-bold'>{d.destinationName}</span> Details</h1>
            <div className='space-y-8'>
                <div className='relative overflow-hidden w-full h-150 mx-auto'>
                    <Image src={d.imageUrl} alt={d.destinationName} fill className='object-cover object-center' />
                </div>
                <div className='space-y-2'>
                    <p className='flex items-center gap-1'><CiLocationOn />{d.country}</p>
                    <p className='text-2xl font-bold'>{d.destinationName}</p>
                    <p className='flex items-center gap-1'><FaRegCalendarAlt />{d.duration}</p>
                </div>

                <div className='space-y-2'>
                    <p className='text-2xl font-bold'>Overview</p>
                    <p>{d.description}</p>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;