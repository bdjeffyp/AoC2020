import fs from "fs";

interface IPasswordDatabase {
  minRequired: number;
  maxRequired: number;
  requiredCharacter: string;
  password: string;
}

// Add each input item into an array
const prepareData = (): IPasswordDatabase[] => {
  const input = fs.readFileSync("./input.txt").toString();
  return input.split("\n").map((value: string) => {
    const temp = value.split(/(\d{1,2})-(\d{1,2}) (.): (\w+)/);
    return {
      // temp[0] is an empty string
      minRequired: parseInt(temp[1]),
      maxRequired: parseInt(temp[2]),
      requiredCharacter: temp[3],
      password: temp[4],
    } as IPasswordDatabase;
  });
};

// Parse database for valid passwords
const parseDatabase = (data: IPasswordDatabase[]): number => {
  let validEntries = 0;
  data.forEach((entry: IPasswordDatabase) => {
    const count = entry.password.split(entry.requiredCharacter).length - 1;
    if (count >= entry.minRequired && count <= entry.maxRequired) {
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
