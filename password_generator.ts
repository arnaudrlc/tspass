/**
 * Complex password generator using TypeScript.
 *
 * Developped as a curiosity side project, to try out a bit of TS. Hence, this script may not showcase best writting
 * conventions or best use of TS' functionalities.
 */


const alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const specialCharacters: string = '@#&£$_+%*';


/**
 * Returns ratios between letters, numbers and special characters.
 *
 * @param {Number} desiredLength -- Total lenght of the password to be generated.
 * @returns Ratios.
 */
function getRatios(desiredLength: number) {
    let letters: number;
    let numbers: number;
    let specialCharacters: number;

    letters = Math.floor(desiredLength / 2);
    numbers = specialCharacters = letters % 2 === 0 ? Math.floor(letters / 2) : Math.floor(letters / 2) + 1;

    return [letters, specialCharacters, numbers];
}


/**
 * Returns a random integer between inputed min and max values.
 *
 * @param {Number} min -- Minimum random value possible.
 * @param {Number} max -- Maximum random value possible.
 * @returns Random integer.
 */
function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}


/**
 * Generates and returns a complew password.
 *
 * @param {Number} desiredLength -- Length of the password.
 * @returns Passwords.
 */
function passwordGenerator(desiredLength: number = 8) {
    try {
        if (desiredLength < 8) throw Error('A valid password must contain at least 8 characters.');

        let [lettersRatio, numbersRatio, specialCharactersRatio] = getRatios(desiredLength);

        let password = Array.from(
            { length: lettersRatio },
            () => alphabet.charAt(randomNumber(0, alphabet.length))
        )
            .concat(
                Array.from(
                    { length: numbersRatio },
                    () => randomNumber(0, 9).toString()
                )
            )
            .concat(
                Array.from(
                    { length: specialCharactersRatio },
                    () => specialCharacters.charAt(randomNumber(0, specialCharacters.length))
                )
            )
            .sort(() => Math.random() - 0.5)
            .join('');

        return password;

    } catch (error) {
        console.error(error.message);
    }
}


let password: string | undefined = passwordGenerator(12);
console.log(password);
