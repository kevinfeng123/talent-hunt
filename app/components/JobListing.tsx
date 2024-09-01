"use client";

import Link from "next/link";
import deleteJob from "../actions/deleteJob";
import { useRouter } from "next/router";

export type JobProps = {
    _id: string;
    title: string;
    description: string;
    workMode: string;
    typeOfWork: string;
    salary: number;
    country: string;
    region: string;
    orgId: string;
    orgName: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type JobListingProps = {
    listings: JobProps[];
    orgName: string;
}


export default function JobListing({listings, orgName}:JobListingProps) {
    
    

    async function handleDelete(listingId: string) {
        
        await deleteJob(listingId)
        
    };

    return (

        <div className="flex flex-col bg-white">
            {listings && listings.map(listing => (
                <div key={listing._id} className= "text-white mb-5 p-5 bg-sky-blue rounded-md flex">
                    <div className="flex-grow">
                        <div className="text-navy-blue font-bold">{orgName}</div>
                        <div className="text-lg text-navy-blue font-bold">{listing.title}</div> 
                        <div className="text-navy-blue">{listing.typeOfWork} - {listing.workMode} - ${listing.salary.toLocaleString()} - Location: {listing.country}, {listing.region}</div>    
                    </div>
                    <div className="">
                        <Link href={`/jobs/${listing._id}`} className="text-navy-blue hover:text-white"> View Listing</Link>
                        <br/>
                        <Link href={`/jobs/edit/${listing._id}`} className="text-navy-blue hover:text-white"> Edit Listing</Link>
                        <br/>
                        <button className="text-navy-blue hover:text-white" onClick={() => deleteJob(listing._id)}> Delete Listing</button>
                    </div>
                </div>
            ))}
        </div>
    )
}