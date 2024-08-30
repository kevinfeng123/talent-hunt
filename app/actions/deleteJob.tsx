"use server";

import mongoose from "mongoose";
import { ListingModel } from "../models/Listing";

export default async function deleteJob(jobId: string) {
    await mongoose.connect(process.env.MONGO_URI as string);

    const deletedJob = await ListingModel.findByIdAndDelete(jobId);
    if (!deletedJob) {
        return "job not found";
    }
}