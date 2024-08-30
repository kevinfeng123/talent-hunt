"use server";

import { getUser } from "@workos-inc/authkit-nextjs"
import { AutoPaginatable, OrganizationMembership, WorkOS } from "@workos-inc/node";
import createCompany from "../actions/workOS";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ManageOrganizations() {

    const {user} = await getUser();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    
    if (!user){
        return (
            <div>
                Please Login
            </div>
        )
    }
   
    const organizationMembership = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
    },)

    const handleNewCompanyFormSubmit = async (data: FormData) => {
        "use server";
        const companyName = data.get('newCompanyName') as string;
        if (companyName.length > 0){
            if (user){
                await createCompany(companyName, user.id);
                redirect('/organizations')
            } else{
                console.log("user id is null")
            } 
        }

    }

    const activeOrganizations = organizationMembership.data.filter(org => org.status === "active");
    const organizationNames: {[key: string]: string} = {};

    for (const activeOrganization of activeOrganizations){
        const organization = await workos.organizations.getOrganization(activeOrganization.organizationId)
        organizationNames[organization.id] = organization.name;
    }



    return(
        <div className="py-2 px-8 mx-auto">
            {user && (
        
                <div className="text-navy-blue">
                    Welcome {user.firstName}

                    <form className="mt-4" action={handleNewCompanyFormSubmit}>
                        <h1 className="font-bold text-2xl">Create a Company</h1>
                        <p>Please register a Company first before creating a job</p>
                        <input 
                        name="newCompanyName"
                        type="text" 
                        placeholder="Company Here..."
                        className="border border-sky-blue rounded-md py-2 px-4 mt-4"
                        >
                        </input>
                        
                        <button type="submit" className="rounded-md py-2 px-4 bg-sky-blue ml-2">
                                Create
                        </button>
                    </form>
                </div>
            )}

            <section className="text-navy-blue mt-5">
                <h1 className="text-xl font-bold">Your Companies</h1>
                <p>Select the company to create a listing for:</p>
                    <div className="my-5">
                    {Object.keys(organizationNames).map(key => (
                        <div key = {key} className="my-5 text-navy-blue border border-sky-blue p-4 font-bold">
                            <Link href={`/organizations/${key}`} >
                            {organizationNames[key]}
                            </Link>
                        </div>
                    ))}
                </div>
                
                
               {/* <pre>
                {JSON.stringify(activeOrganizations[1],null,2)}
               </pre> */}

            </section>

        </div>
        
    )
}