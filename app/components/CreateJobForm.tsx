"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import uploadJob from "../actions/uploadJob";
import type { JobListingProps, JobProps } from "./JobListing";

type PageProps = {
   orgId: string;
   orgName: string;
   prevListingDoc?: JobProps;
}


export default function CreateJobForm ({orgId, orgName, prevListingDoc}: PageProps) {

    const [country, selectCountry] = useState("");
    const [region, selectRegion] = useState("");
  
    async function handleSubmit (data:FormData) {
        if (region && country)
            {data.set("isUpdate", prevListingDoc ? "true" : "false");
            if (prevListingDoc) {
                data.set("_id", prevListingDoc._id);
            }
            data.set("country", country)
            data.set("region", region)
            data.set("orgId", orgId)  
            data.set("orgName", orgName)
            const listingDoc = await uploadJob(data)
            redirect(`/organizations/${orgId}`)
        }
    }

    useEffect(() => {
        if (prevListingDoc) {
            if (prevListingDoc.country) {
                selectCountry(prevListingDoc.country);
            }
            if (prevListingDoc.region) {
                selectRegion(prevListingDoc.region);
            }
        }
    }, [prevListingDoc]);

    return (
        
        <div className="text-navy-blue py-2 px-8 mt-4 bg-white">
            <h1 className="font-bold text-xl">{prevListingDoc ? "Update" : "Create"} a Job Listing</h1>
            <form 
            className="flex flex-col mt-10 justify-center gap-3"
            action = {handleSubmit}
            >
                <label className="input input-bordered border-sky-blue flex items-center gap-2">
                Job Title
                    <input type="text" name="title" className="grow" placeholder="Junior Developer" defaultValue={prevListingDoc?.title} required/>
                </label>
                <label className="input input-bordered border-sky-blue flex items-center gap-2">
                Salary $
                    <input type="number" name="salary" className="grow" placeholder="130000" defaultValue={prevListingDoc?.salary} required/>
                </label>
                <textarea className="textarea textarea-bordered border-sky-blue" name="description" placeholder="Job Description" defaultValue={prevListingDoc?.description} required></textarea>

                <div className="form-control mt-5 flex-row gap-8" >
                    <div className="flex-1">
                        <div className="text-navy-blu">
                        <h1 className="pl-1 font-bold">Location</h1>
                        <CountryDropdown
                        value={country}
                        onChange={(val) => selectCountry(val)}
                        
                        /> 
                        <RegionDropdown
                        country={country}
                        value={region}
                        onChange={(val) => selectRegion(val)}
                        />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className="pl-1 font-bold">Work Mode</h1>
                        <label className="label cursor-pointer">
                            <span className="text-navy-blue">In-Office</span>
                            <input type="radio" name="workMode" value="In Office" className="radio checked:bg-sky-blue" defaultChecked={!prevListingDoc || prevListingDoc?.workMode === "In Office"} />
                        </label>
                        <label className="label cursor-pointer">
                            <span className="text-navy-blue">Hybrid</span>
                            <input type="radio" name="workMode" value="Hybrid"className="radio checked:bg-sky-blue" defaultChecked={prevListingDoc?.workMode === "Hybrid"} />
                        </label>
                        <label className="label cursor-pointer">
                            <span className="text-navy-blue">Remote</span>
                            <input type="radio" name="workMode" value="Remote"className="radio checked:bg-sky-blue" defaultChecked={prevListingDoc?.workMode === "Remote"} />
                        </label>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-navyblue font-bold">Type of Work</h1>
                        <label className="label cursor-pointer">
                            <span className="text-navy-blue">Full-Time</span>
                            <input type="radio" name="typeOfWork" value="Full Time" className="radio checked:bg-sky-blue" defaultChecked={!prevListingDoc || prevListingDoc?.typeOfWork === "Full Time"} />
                        </label>
                        <label className="label cursor-pointer">
                            <span className="text-navy-blue">Part-Time</span>
                            <input type="radio" name="typeOfWork" value="Part Time" className="radio checked:bg-sky-blue" defaultChecked={prevListingDoc?.typeOfWork === "Part Time"} />
                        </label>
                        <label className="label cursor-pointer">
                            <span className="text-navy-blue">Contract</span>
                            <input type="radio" name="typeOfWork" value="Contract" className="radio checked:bg-sky-blue" defaultChecked={prevListingDoc?.typeOfWork === "Contract"} />
                        </label>

                    </div>

                </div>
                <button type="submit" className="btn btn-primary">
                {prevListingDoc ? "Update" : "Create"} Job Listing
                </button>
            </form>
        </div>
    )
}