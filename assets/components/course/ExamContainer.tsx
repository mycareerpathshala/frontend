/* eslint-disable @next/next/no-img-element */
// imports

// local components
function ExamIcon({ imgFileName, altText }: { imgFileName: string; altText: string }) {
    return (
        <span className="relative">
            <img src={`/img/exams/${imgFileName}`} alt={altText} />
        </span>
    );
}

export default function ExamContainer({ examLevel }: { examLevel: 'Undergraduate' | 'Postgraduate' }) {
    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex justify-start gap-1.5">
                <ExamIcon imgFileName="ielts.svg" altText="IELTS Icon" />
                {examLevel === 'Undergraduate' && <ExamIcon imgFileName="toefl.svg" altText="TOEFL Icon" />}
                <ExamIcon imgFileName="duolingo.svg" altText="Duolingo Icon" />
            </div>

            <div className="flex justify-start gap-1.5">
                {examLevel === 'Undergraduate' && <ExamIcon imgFileName="sat.svg" altText="SAT Icon" />}
                {examLevel === 'Undergraduate' && <ExamIcon imgFileName="act.svg" altText="ACT Icon" />}
                {examLevel === 'Postgraduate' && <ExamIcon imgFileName="gmat.svg" altText="GMAT Icon" />}
                {examLevel === 'Postgraduate' && <ExamIcon imgFileName="gre.svg" altText="GRE Icon" />}
            </div>
        </div>
    );
}
