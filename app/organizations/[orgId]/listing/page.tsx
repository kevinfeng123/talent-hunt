import { getUser } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node"
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import CreateJobForm from "@/app/components/CreateJobForm";

type PageProps = {
    params: {
        orgId: string;
    }
}

export default async function JobListingPage (props: PageProps) {

    const {user} = await getUser();
    const orgId = props.params.orgId
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(orgId)
    const orgName = org.name;

    if (!user){
        return (
            <div>
                User is not logged in
            </div>
        )
    }

    

    const userOrgs = await workos.userManagement.listOrganizationMemberships({userId: user.id, organizationId: orgId})
    const hasAccess = userOrgs !== null


    if (!hasAccess){
        return (
            <div>
                User is not a part of this organization
            </div>
        )
    }
   

    return (
        
            <>
            <CreateJobForm orgId= {orgId} orgName = {orgName}/>
            {/* <div>hello {JSON.stringify(props)} </div>
            <div>{orgId}</div> */}

            </>
          
       
    )
}