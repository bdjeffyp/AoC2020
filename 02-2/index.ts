import fs from "fs";

interface IPasswordDatabase {
  validPosition: number;
  invalidPosition: number;
  characterToCheck: string;
  password: string;
}

// Add each input item into an array
const prepareData = (): IPasswordDatabase[] => {
  const input = fs.readFileSync("./input.txt").toString();
  return input.split("\n").map((value: string) => {
    const temp = value.split(/(\d{1,2})-(\d{1,2}) (.): (\w+)/);
    return {
      // temp[0] is an empty string
      validPosition: parseInt(temp[1]) - 1,
      invalidPosition: parseInt(temp[2]) - 1,
      characterToCheck: temp[3],
      password: temp[4],
    } as IPasswordDatabase;
  });
};

// Parse database for valid passwords
const parseDatabase = (data: IPasswordDatabase[]): number => {
  let validEntries = 0;
  data.forEach((entry: IPasswordDatabase) => {
    const password = entry.password;
    const char = entry.characterToCheck;
    // If one position is valid, the other must be invalid.
    if (password.charAt(entry.validPosition) === char && password.charAt(entry.invalidPosition) !== char) {
      validEntries++;
    } else if (password.charAt(entry.validPosition) !== char && password.charAt(entry.invalidPosition) === char) {
      validEntries++;
    }
  });
  return validEntries;
};

console.log(`Parsing the database for valid entries...`);
const data = prepareData();
console.log(`There are ${data.length} entries to parse`);
const result = parseDatabase(data);
console.log(`The number of valid entries is '${result}'`);
