// imports
import Image from 'next/image';
import Link from 'next/link';

// local components
function Card({
    imgURL,
    imgAlt,
    cardTitle,
    cardDesc,
    linkURL,
    linkText,
}: {
    imgURL: string;
    imgAlt: string;
    cardTitle: string;
    cardDesc: string;
    linkURL: string;
    linkText: string;
}) {
    return (
        <div className="bg-primary-gray flex flex-col items-center overflow-hidden rounded-xl p-6">
            <div className="flex">
                <Image width={144} height={144} src={imgURL} alt={imgAlt} className="h-auto w-auto object-contain" />
            </div>
            <h4 className="mt-4 text-lg font-bold">{cardTitle}</h4>
            <p className="mt-4 text-center text-sm">{cardDesc}</p>
            <Link
                href={linkURL}
                className="mt-4 flex cursor-pointer items-center gap-1.5 transition-all duration-200 ease-in-out select-none hover:gap-2"
            >
                <span className="text-primary-base text-base font-semibold">{linkText}</span>
                <span className="text-primary-base text-base font-semibold">&gt;</span>
            </Link>
        </div>
    );
}

export default function DiscoverCards() {
    return (
        <section className="mx-auto mt-28 w-full max-w-7xl px-4">
            <h3 className="text-center text-3xl font-bold max-md:text-2xl">
                Discover and apply to universities all in one place
            </h3>
            <div className="mt-12 grid grid-cols-3 gap-8 max-xl:gap-3 max-md:grid-cols-1 max-md:gap-6">
                {/* find programs */}
                <Card
                    imgURL="/img/homepage/discover/exploreProgramsImage.png"
                    imgAlt="Find Programs Image"
                    cardTitle="Explore Programs"
                    cardDesc="Explore over 20,000 programs and find your perfect course in just seconds"
                    linkURL="#"
                    linkText="Find Programs"
                />

                {/* find university */}
                <Card
                    imgURL="/img/homepage/discover/applyUniversityImage.png"
                    imgAlt="Find University Image"
                    cardTitle="Explore University"
                    cardDesc="Explore over 1000 universities and find your preferred university from everywhere"
                    linkURL="#"
                    linkText="Find University"
                />

                {/* get guidance */}
                <Card
                    imgURL="/img/homepage/discover/getGuidance.png"
                    imgAlt="Apply University Image"
                    cardTitle="Get Guidance"
                    cardDesc="Dedicated career mentor will help you at every stage of study abroad journey"
                    linkURL="/dashboard/counselling"
                    linkText="Talk to Counsellor"
                />
            </div>
        </section>
    );
}
