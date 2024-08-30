import { ListingModel } from "@/app/models/Listing"
import mongoose from "mongoose";

type PageProps = {
    params: {
        _id: string;
    }
}

export default async function ViewListingPage(props: PageProps) {

    await mongoose.connect(process.env.MONGO_URI as string);

    const listingId = props.params._id;
    const listingDoc = await ListingModel.findById(listingId);

    const createdAt = new Date(listingDoc.createdAt).toLocaleDateString();
    const updatedAt = new Date(listingDoc.updatedAt).toLocaleDateString();

    return (
        <div className="mx-8 mt-5 *:text-navy-blue">
            <h1 className="italic">Viewing Job</h1>
            <p>----------------</p>
            <h1 className="text-2xl font-extrabold">{listingDoc.title}</h1>
            <h1 className="text-xl font-bold">{listingDoc.orgName}</h1>
            <h1 className="text-lg">Salary: ${listingDoc.salary.toLocaleString()}</h1>
            <p className="mt-10">Description</p>
            <div className="">{listingDoc.description}</div>

            <p className="mt-5">Location: {listingDoc.country}, {listingDoc.region}</p>
            <p>Listing created: {createdAt}</p>
            <p>Last updated: {updatedAt}</p>
        </div>
    )
}