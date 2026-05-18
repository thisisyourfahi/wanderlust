import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const DestinationCard = ({ d }) => {
    return (
        <div className='border p-4 space-y-2'>
            <div className='relative overflow-hidden aspect-square'>
                <Image src={d.imageUrl} alt={d.destinationName}  fill className='object-cover' />
            </div>
            <p className='flex items-center gap-1'><CiLocationOn /> <strong>{d.country}</strong></p>
            <div className='flex justify-between'>
                <p className='text-xl font-bold'>{d.destinationName}</p>
                <p>$<span className='text-xl font-bold'>{d.price}</span><small>/person</small></p>
            </div>
            <p className='flex items-center gap-1'><FaRegCalendarAlt />{d.duration}</p>
            <Link href={`/destinations/${d._id}`} className='text-blue-500 flex items-center gap-1'>BOOK NOW <FiExternalLink /></Link>
        </div>
    );
};

export default DestinationCard;