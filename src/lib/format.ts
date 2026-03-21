export function formatCurrency(amount: number | string | null | undefined): string {
    const value = typeof amount === "string" ? parseFloat(amount) : amount;

    if (value === null || value === undefined || isNaN(value)) {
        return "$0.00";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}
