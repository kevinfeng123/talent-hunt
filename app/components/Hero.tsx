import Link from "next/link"

export default function Hero() {


    return (
        <div className="bg-white pt-40 mt-20 text-center">
            <h1 className="text-4xl font-bold text-navy-blue mb-10">Recruit the Brighest Minds For <br/>Your Organization!</h1>
            

            <Link href="/organizations"
            className="bg-navy-blue text-white hover:text-sky-blue rounded-md py-2 px-4 mt-10"
            > Recruit Now! </Link>

        </div>
    )
}