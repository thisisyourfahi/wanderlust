import DeleteModal from "@/components/DeleteModal";
import { AlertDialog, Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaClock, FaEye, FaRegCalendarAlt, FaTrash } from "react-icons/fa";

const BookedCards = async ({ bookingInfo }) => {
    const destId = bookingInfo.destinationID;
    const res = await fetch(`http://localhost:5000/destinations/${destId}`);
    const d = await res.json();
    console.log(d);
    return (
        <div className='p-4 border flex justify-between'>
            <div className="flex  items-center gap-4">
                <div className="relative">
                    <Image alt="Destination Picture" src={d.imageUrl} width={400} height={200} className="object-cover object-center"></Image>
                </div>
                <div className="space-y-2">
                    <Chip color="success" className="rounded-none">
                        <FaCheck width={12} />
                        <Chip.Label>Confirmed</Chip.Label>
                    </Chip>
                    <h2 className="text-2xl font-bold">{d.destinationName}</h2>
                    <p className='text-muted flex items-center gap-1'><FaRegCalendarAlt />{d.departureDate}</p>
                    <p className='text-muted flex items-center gap-1'><FaClock />{d.duration}</p>
                    <p className='text-2xl text-cyan-500 font-bold'>${d.price}</p>

                </div>
            </div>

            <div className="flex gap-2 items-end">
                <Link href={`/destinations/${d._id}`}>
                    <Button size="sm" className={'rounded-none bg-cyan-500'}>
                        <FaEye /> View
                    </Button>
                </Link>
                <DeleteModal destination={d} deleteBooking={true}/>
            </div>
        </div>
    );
};

export default BookedCards;