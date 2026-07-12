export function addStrings(str1: string, str2: string): string {
    return (BigInt(str1) + BigInt(str2)).toString();
}

export function SubtractStrings(str1: string, str2: string): string {
    return (BigInt(str1) - BigInt(str2)).toString();
}


export function claculateMargin(qty : string , price :string , leverage : string) : string{ 
    return (( BigInt( qty ) * BigInt(price) ) / BigInt(leverage)).toString() 
}



type CompareOperator = "<" | ">" | "<=" | ">=" | "==" | "!=";

export function compareStringNumbers( val1: string,  val2: string, operator: CompareOperator ): boolean {
  const num1 = Number(val1);
  const num2 = Number(val2);

  if (isNaN(num1) || isNaN(num2)) {
    return false;
  }

  switch (operator) {
    case "<":
      return num1 < num2;
    case ">":
      return num1 > num2;
    case "<=":
      return num1 <= num2;
    case ">=":
      return num1 >= num2;
    case "==":
      return num1 === num2;
    case "!=":
      return num1 !== num2;
  }
}