import Link from "next/link";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";
import { ListingModel } from "@/app/models/Listing";
import JobListing from "@/app/components/JobListing";

type PageProps = {
    params: {
        orgId: string;
    }
}

export default async function OrganizationPage(props: PageProps) {

    const workos = new WorkOS (process.env.WORKOS_API_KEY)
    const orgId = props.params.orgId;
    const org = await workos.organizations.getOrganization(orgId)
    await mongoose.connect(process.env.MONGO_URI as string)
    const listingDocs = await ListingModel.find({orgId: orgId})
    const orgName = org.name

    return (
        <div className="px-8 text-navy-blue">
            <Link href={`/organizations/${orgId}/listing`} className="font-bold border bg-navy-blue text-white py-2 px-4 rounded-md hover:text-sky-blue "> Create a Job Listing </Link>
            <div className="mt-10 text-bold text-lg mb-10">
                Current Jobs Postings for {orgName}
            </div>
            {listingDocs.length === 0 && (
                <div className="mt-5 text-bold text-large"> No Job Listings Available </div>
            )
            }
            <JobListing listings = {listingDocs} orgName = {orgName}/>
            {/* <pre>hello {JSON.stringify(listingDocs, null, 2)} </pre> */}
        </div>
    )
}
