export function addStrings(str1: string, str2: string): string {
    return (BigInt(str1) + BigInt(str2)).toString();
}

export function SubtractStrings(str1: string, str2: string): string {
    return (BigInt(str1) - BigInt(str2)).toString();
}