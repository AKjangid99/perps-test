export function sortNumericStringsDesc(arr: string[]): string[] {
    return [...arr].sort((a, b) => {
        a = a.replace(/^0+/, "") || "0";
        b = b.replace(/^0+/, "") || "0";

        if (a.length !== b.length) {
            return b.length - a.length;
        }

        return b.localeCompare(a);
    });
}

export  function sortNumericStringsAsce(arr: string[]): string[] {
    return [...arr].sort((a, b) => {
        a = a.replace(/^0+/, "") || "0";
        b = b.replace(/^0+/, "") || "0";

        if (a.length !== b.length) {
            return b.length - a.length;
        }

        return b.localeCompare(a);
    });
}
