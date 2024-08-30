"use server";

import mongoose from "mongoose";
import { ListingModel } from "../models/Listing";

export default async function uploadJob (data: FormData) {
    await mongoose.connect(process.env.MONGO_URI as string);

    const formData = Object.fromEntries(data);
    const isUpdate = formData.isUpdate === "true";
    delete formData.isUpdate;

    let listingDoc;
    
    // console.log("test", isUpdate, formData)
    if (isUpdate) {
        console.log("updating job");
        const _id = formData._id;
        delete formData._id;
        listingDoc = await ListingModel.findByIdAndUpdate(_id, formData, { new: true });
    } else {
        console.log("creating job");
        listingDoc = await ListingModel.create(formData);
    }

    const plainListingDoc = listingDoc.toObject();
    const simpleListingDoc = {
        ...plainListingDoc,
        _id: plainListingDoc._id.toString(),
        orgId: plainListingDoc.orgId ? plainListingDoc.orgId.toString() : null,
        createdAt: plainListingDoc.createdAt.toISOString(),
        updatedAt: plainListingDoc.updatedAt.toISOString(),
    };

    return simpleListingDoc;
}