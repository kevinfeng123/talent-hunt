import { ListingModel } from "@/app/models/Listing"
import mongoose from "mongoose";
import { WorkOS } from "@workos-inc/node";
import { getUser } from "@workos-inc/authkit-nextjs";
import CreateJobForm from "@/app/components/CreateJobForm";

type PageProps = {
    params: {
        _id: string;
    }
}

export default async function EditListingPage(props: PageProps) {

    const listingId = props.params._id;
    await mongoose.connect(process.env.MONGO_URI as string);    
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const {user} = await getUser();
    const listingDoc = JSON.parse(JSON.stringify(await ListingModel.findById(listingId)));
    const orgId = listingDoc.orgId;
    const org = await workos.organizations.getOrganization(orgId)
    const orgName = org.name;


    if (!user){
        return(
            <div>Please Log In</div>
        )
    }

    return (
        <div>
            <CreateJobForm orgId={orgId} orgName={orgName} prevListingDoc={listingDoc}></CreateJobForm>
        </div>
    )
}