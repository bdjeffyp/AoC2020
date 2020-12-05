import fs from "fs";

interface IPassportData {
  birthYear: string;
  issueYear: string;
  expirationYear: string;
  height: string;
  hairColor: string;
  eyeColor: string;
  passportId: string;
  countryId?: string;
}

// Add each input item into an array
const prepareData = (): string[] => {
  const input = fs.readFileSync("./input.txt").toString();
  return input.split("\n");
};

// Parse the raw data to build passport entries
const parseRawData = (rawData: string[]): string[] => {
  // Process will be:
  // - Entries are separated by a blank line (array will contain '\r' only)
  // - Step through array, combining rows into one string, until a blank row is found. This is one passport entry.
  // - Parse this entry for fields. Begin to populate the items in the IPassportData.
  // - If all but countryId is found, that is a valid passport! Increment the validPassports counter.
  // Repeat until all entries are parsed and return validPassports!
  const entries: string[] = [];

  let i = 0;
  do {
    // Get the next row, removing the carriage return character with a space
    let entry = rawData[i].replace("\r", " ");
    // Continue iterating through the array, concatenating the strings until a blank row is found.
    // Ugh this is messy...
    while (rawData[i + 1] !== "\r") {
      i++;
      // Catch the final row
      if (i === rawData.length) {
        break;
      }
      entry += rawData[i].replace("\r", " ");
    }
    // Add the parsed data with leading whitespace removed if it exists
    entries.push(entry.trimStart());
    i++;
  } while (i < rawData.length);

  return entries;
};

// Validate passport entries
const validatePassportEntries = (entries: string[]): number => {
  let validPassports = 0;

  // Split each entry into it's respective parts
  entries.forEach((entry: string) => {
    const items = entry.split(" ");
    // Remove the last item if it is a blank string
    if (items[items.length - 1] === "") {
      items.pop();
    }
    // Skip any entries that have less than seven items!
    if (items.length < 7) {
      return;
    }
    // Sort it!
    const sortedItems = items.sort().reverse();
    // If the entry is missing anything but "cid", skip it.
    if (sortedItems[0].slice(0, 3) !== "pid") {
      return;
    }
    if (sortedItems[1].slice(0, 3) !== "iyr") {
      return;
    }
    if (sortedItems[2].slice(0, 3) !== "hgt") {
      return;
    }
    if (sortedItems[3].slice(0, 3) !== "hcl") {
      return;
    }
    if (sortedItems[4].slice(0, 3) !== "eyr") {
      return;
    }
    if (sortedItems[5].slice(0, 3) !== "ecl") {
      return;
    }
    validPassports++;
  });

  return validPassports;
};

const rawData = prepareData();
console.log(`Parsing raw data...`);
const entries = parseRawData(rawData);
console.log(`Found ${entries.length} passport entries.`);
console.log(`Looking for valid passports...`);

const validPassports = validatePassportEntries(entries);
console.log(`Number of valid passports in batch file: ${validPassports}`);
