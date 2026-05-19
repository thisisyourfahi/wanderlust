import React from 'react';
import DestinationCard from '../../components/DestinationCard';

const DestinationPage = async () => {
    const res = await fetch('http://localhost:5000/destinations');
    const data = await res.json();

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>{data.length} Destinations</h1>
            
            <div className='grid grid-cols-3 gap-10'>
                {data.map(d => <DestinationCard key={d._id} d={d} />)}
            </div>
        </div>
    );
};

export default DestinationPage;