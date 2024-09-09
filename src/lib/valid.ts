export class validInput {
  public NullEmptyString(value: string) {
    return !value || !value.replace(' ', '');
  }

  public static checkString(str: string) {
    const chars = Array.from(str);

    const hasUppercase = chars.some((char) => /[A-Z]/.test(char));
    const hasLowercase = chars.some((char) => /[a-z]/.test(char));
    const hasNumeric = chars.some((char) => !isNaN(Number(char)) && char !== ' ');
    const hasSpace = chars.some((char) => char === ' ');
    const hasSpecial = chars.some((char) => /[!@#$%^&*(),.?":{}|<>]/.test(char));

    return {
      hasUppercase,
      hasLowercase,
      hasNumeric,
      hasSpecial,
      hasSpace,
    };
  }
}
