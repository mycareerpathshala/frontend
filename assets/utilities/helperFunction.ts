// timer function
export const timer = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

// blog date format
export function formatDateToBlogStringDate(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' } as const;
    return date.toLocaleDateString('en-US', options);
}

// Helper for currency formatting
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(
        amount,
    );
}


// date to month, year
export function formatDateToMonthYear(dateString: string) {
    if (!dateString) return 'TBA'; // Handle empty dates

    const date = new Date(dateString);

    // Check if the date is actually valid
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat('en-US', {
        month: 'long', // Use 'short' for "Aug" or 'long' for "August"
        year: 'numeric',
    }).format(date);
};