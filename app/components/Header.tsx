import { getSignInUrl, getSignUpUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header () {
    const { user } = await getUser();
    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();

    return (
        <header className= "bg-white flex px-4 py-2 *:py-2 *:px-4 justify-between"> 
            <Link href="/" className="text-navy-blue font-extrabold text-2xl ">
                TalentHunt
            </Link>
            <div className="flex *:rounded-md *:py-2 *:px-4 gap-4">
                {!user && (
                    <>
                        <Link href={signInUrl} className="text-white bg-navy-blue hover:text-sky-blue">
                        Login
                        </Link> 
                        <Link href ={signUpUrl} className="text-white bg-navy-blue hover:text-sky-blue">
                        Sign Up
                        </Link>
                    </>
                   
                )}
                {user && (
                    <>
                        <div className="text-sky-blue">
                            Welcome {user.firstName}
                        </div>
                        
                        <Link href={"/organizations"} className="text-white hover:text-sky-blue bg-navy-blue">
                        Post a Job
                        </Link>

                        <form
                        className="bg-navy-blue"
                        action={async () => {
                        'use server';
                        await signOut();
                        }}
                        >
                        <button type="submit" className="text-white hover:text-sky-blue"> Sign Out</button>
                        </form>
                    </>
                    
                )}
                
            </div>
        </header>
    )
}
