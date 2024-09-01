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
    try {
        console.log("Starting OrganizationPage function");

        const workos = new WorkOS(process.env.WORKOS_API_KEY);
        const orgId = props.params.orgId;
        console.log(`Fetching organization with ID: ${orgId}`);

        let org;
        try {
            org = await workos.organizations.getOrganization(orgId);
            console.log("Successfully fetched organization");
        } catch (error) {
            console.error("Error fetching organization:", error);
            throw new Error("Failed to fetch organization");
        }

        console.log("Connecting to MongoDB");
        try {
            await mongoose.connect(process.env.MONGO_URI as string);
            console.log("Successfully connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw new Error("Failed to connect to MongoDB");
        }

        console.log(`Fetching listings for organization: ${orgId}`);
        let listingDocs;
        try {
            listingDocs = await ListingModel.find({orgId: orgId});
            console.log(`Found ${listingDocs.length} listings`);
        } catch (error) {
            console.error("Error fetching listings:", error);
            throw new Error("Failed to fetch listings");
        }

        const orgName = org.name;

        return (
            <div className="px-8 text-navy-blue">
                <Link href={`/organizations/${orgId}/listing`} className="font-bold border bg-navy-blue text-white py-2 px-4 rounded-md hover:text-sky-blue "> Create a Job Listing </Link>
                <div className="mt-10 text-bold text-lg mb-10">
                    Current Jobs Postings for {orgName}
                </div>
                {listingDocs.length === 0 && (
                    <div className="mt-5 text-bold text-large"> No Job Listings Available </div>
                )}
                <JobListing listings={listingDocs} orgName={orgName}/>
            </div>
        );
    } catch (error) {
        console.error("Unhandled error in OrganizationPage:", error);
        return (
            <div className="px-8 text-red-600">
                <h1>Error</h1>
                <p>An error occurred while loading the organization page. Please try again later.</p>
            </div>
        );
    }
}
