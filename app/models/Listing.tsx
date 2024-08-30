import { model, models, Schema } from "mongoose";

const ListingSchema = new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    workMode: {type: String, required: true},
    typeOfWork: {type: String, required: true},
    salary: {type: Number, required: true},
    country: {type: String, required: true},
    region: {type: String, required: true},  
    orgId: {type: String, required: true},
    orgName: {type: String, required: true},
},{
    timestamps: true,
})

export const ListingModel = models.Listing || model('Listing', ListingSchema)