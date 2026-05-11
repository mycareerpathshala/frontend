// imports
import Image, { StaticImageData } from 'next/image';
import ArizonaUniversityLogo from '@/public/img/homepage/universities/arizona-state-university-logo.png';
import NottinghamUniversityLogo from '@/public/img/homepage/universities/university-of-nottingham-logo.png';
import SaskatchewanUniversityLogo from '@/public/img/homepage/universities/university-of-saskatchewan-logo.png';
import DublinCollegeLogo from '@/public/img/homepage/universities/university-college-dublin-logo.png';
import UtahUniversityLogo from '@/public/img/homepage/universities/university-of-utah--logo.png';

// local components
function ImageContainer({ imgFile, imgAlt }: { imgFile: StaticImageData; imgAlt: string }) {
    return (
        <div className="relative h-12 w-full sm:h-12 lg:h-16">
            <Image src={imgFile} alt={imgAlt} fill className="absolute inset-0 h-full w-full object-contain" />
        </div>
    );
}

export default function TopUniversities() {
    return (
        <section className="mx-auto mt-16 w-full max-w-7xl px-4">
            <h3 className="text-center text-3xl font-bold max-md:text-2xl">Compare 400+ Top Universities Worldwide</h3>
            <div className="mt-12 px-4 md:mt-8">
                <div className="grid grid-cols-1 place-items-center gap-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
                    <ImageContainer imgFile={ArizonaUniversityLogo} imgAlt="Arizona State University Logo" />

                    <ImageContainer imgFile={NottinghamUniversityLogo} imgAlt="University of Nottingham Logo" />

                    <ImageContainer imgFile={SaskatchewanUniversityLogo} imgAlt="University of Saskatchewan Logo" />

                    <ImageContainer imgFile={DublinCollegeLogo} imgAlt="University College Dublin Logo" />

                    <ImageContainer imgFile={UtahUniversityLogo} imgAlt="University of Utah Logo" />
                </div>
            </div>
        </section>
    );
}
