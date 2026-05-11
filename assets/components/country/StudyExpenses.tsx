// imports
import { CountryType, MonthlyExpenseItem } from '@/assets/types/countryTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { BsFillHousesFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { HiMapPin } from 'react-icons/hi2';
import { MdSchool } from 'react-icons/md';

// local components
function ExpenseCard({ expenseData }: { expenseData: MonthlyExpenseItem }) {
    return (
        <div className="flex items-center gap-4 rounded-lg bg-linear-to-br from-sky-200/45 from-10% to-white px-4 py-2 shadow-md">
            <span>
                <FaMoneyCheckAlt className="text-primary-light size-12" />
            </span>
            <span className="flex flex-col items-start">
                <span className="text-xs">{expenseData.expenseName}</span>
                <span className="text-md font-semibold">
                    ${expenseData.expenseRange.minimum}-${expenseData.expenseRange.maximum}
                </span>
            </span>
        </div>
    );
}

export default function StudyExpenses({ countryData }: { countryData: CountryType & StrapiDataType }) {
    return (
        <div className="mx-auto mt-20 w-full">
            <div>
                <h3 className="border-l-primary-base border-l-4 pl-4 text-[22px] font-medium">
                    Cost of Study & Expense
                </h3>
            </div>

            {/* tuition fee average & living cost */}
            <div className="mt-8 flex items-center justify-start gap-12 max-[1160px]:gap-6 max-sm:flex-col max-sm:items-stretch max-sm:gap-4">
                {/* tuition fee */}
                <div className="flex items-center gap-4 rounded-lg bg-sky-100 px-4 py-2 shadow-lg max-sm:gap-3">
                    <div>
                        <MdSchool className="text-primary-light size-12 max-sm:size-10" />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-md font-semibold max-sm:text-sm">Tuition Fee (Average)</span>
                        <span className="text-sm max-sm:text-xs">
                            ${countryData.feesPerYear?.minimum}-${countryData.feesPerYear?.maximum}
                        </span>
                    </div>
                </div>

                {/* living cost */}
                <div className="flex items-center gap-4 rounded-lg bg-sky-100 px-4 py-2 shadow-lg max-sm:gap-3">
                    <div>
                        <BsFillHousesFill className="text-primary-light size-9 max-sm:size-8" />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-md font-semibold max-sm:text-sm">Monthly Living Cost (Average)</span>
                        <span className="text-sm max-sm:text-xs">
                            ${countryData.costOfLiving?.minimum}-${countryData.costOfLiving?.maximum}
                        </span>
                    </div>
                </div>
            </div>

            {countryData.monthlyExpenseRange?.length ? (
                <div className="mt-12">
                    <h3 className="text-lg font-semibold max-sm:text-base">Monthly Range of Living Expenses in {countryData.name}</h3>
                    <div className="mt-4 grid grid-cols-3 gap-6 max-[1160px]:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-4">
                        {countryData.monthlyExpenseRange.map((expenseData, id) => {
                            return <ExpenseCard key={id} expenseData={expenseData} />;
                        })}
                    </div>
                </div>
            ) : null}

            <div className="mt-12">
                <h3 className="text-lg font-semibold max-sm:text-base">Cost of Living Index in {countryData.name}</h3>
            </div>

            <div className="mt-4">
                <div className="mx-auto w-full max-w-5xl">
                    <HiMapPin
                        style={{
                            marginLeft: `${((100 / 6) * Number(countryData.livingCostIndex)).toFixed(2)}%`,
                        }}
                        className="size-8 text-red-500 max-sm:size-6"
                    />
                </div>
                <div className="mx-auto h-10 w-full max-w-5xl rounded-full bg-linear-to-r from-[#7EFFD4] to-[#FF0004] max-sm:h-7"></div>
                <div className="mx-auto mt-1.5 flex w-full max-w-5xl justify-between text-xs text-gray-400">
                    <span>Low</span>
                    <span>High</span>
                </div>
            </div>
        </div>
    );
}
