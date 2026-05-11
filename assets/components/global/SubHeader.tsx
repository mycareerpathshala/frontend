// imports

export default function SubHeader({ headerTitle, universityName }: { headerTitle: string; universityName: string }) {
    return (
        <div className="mb-4 w-full rounded-lg bg-linear-to-r from-cyan-100 to-blue-400 py-4 pl-8 max-sm:pl-4">
            <h4 className="mb-1 text-sm max-sm:text-xs">{universityName}</h4>
            <h2 className="text-3xl font-bold max-md:text-2xl max-sm:text-xl">{headerTitle}</h2>
        </div>
    );
}
