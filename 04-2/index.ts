// I was off by two! 158 is the correct answer!

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
    // Validate the fields
    if (sortedItems[0].slice(0, 3) === "pid") {
      // A nine digit number including leading zeros
      const id = sortedItems[0].slice(4);
      if (id.length !== 9) {
        return;
      }
      if (isNaN(parseInt(id, 10))) {
        return;
      }
    } else if (sortedItems[0].slice(0, 3) !== "pid") {
      return;
    }

    if (sortedItems[1].slice(0, 3) === "iyr") {
      // A four digit number between 2010 and 2020
      const rawYear = sortedItems[1].slice(4);
      if (rawYear.length !== 4) {
        return;
      }
      const year = parseInt(rawYear, 10);
      if (isNaN(year)) {
        return;
      }
      if (year < 2010 || year > 2020) {
        return;
      }
    } else if (sortedItems[1].slice(0, 3) !== "iyr") {
      return;
    }

    if (sortedItems[2].slice(0, 3) === "hgt") {
      // 150-193cm or 59-76in
      const rawHeight = sortedItems[2].slice(4);
      const units = rawHeight.slice(rawHeight.length - 2);
      const height = parseInt(rawHeight.slice(0, -2));
      if (isNaN(height)) {
        return;
      }
      if (units === "cm" && (height < 150 || height > 193)) {
        return;
      }
      if (units === "in" && (height < 59 || height > 76)) {
        return;
      }
    } else if (sortedItems[2].slice(0, 3) !== "hgt") {
      return;
    }

    if (sortedItems[3].slice(0, 3) === "hcl") {
      // A six digit hex color
      const rawColor = sortedItems[3].slice(4);
      if (rawColor.charAt(0) !== "#") {
        return;
      }
      const color = rawColor.slice(1);
      // TODO: This could be a trouble point as I am unsure if this is working right...
      if (isNaN(parseInt(color, 16))) {
        return;
      }
    } else if (sortedItems[3].slice(0, 3) !== "hcl") {
      return;
    }

    if (sortedItems[4].slice(0, 3) === "eyr") {
      // Four digit year between 2020 and 2030
      const rawYear = sortedItems[4].slice(4);
      if (rawYear.length !== 4) {
        return;
      }
      const year = parseInt(rawYear, 10);
      if (isNaN(year)) {
        return;
      }
      if (year < 2020 || year > 2030) {
        return;
      }
    } else if (sortedItems[4].slice(0, 3) !== "eyr") {
      return;
    }

    if (sortedItems[5].slice(0, 3) === "ecl") {
      // Must be one of 7 items
      const color = sortedItems[5].slice(4);
      if (color.length !== 3) {
        return;
      }
      if (
        color !== "amb" &&
        color !== "blu" &&
        color !== "brn" &&
        color !== "gry" &&
        color !== "grn" &&
        color !== "hzl" &&
        color !== "oth"
      ) {
        return;
      }
    } else if (sortedItems[5].slice(0, 3) !== "ecl") {
      return;
    }

    if (sortedItems[6].slice(0, 3) === "byr") {
      // We can skip "cid" so if this is "byr", it must be between 1920 and 2002.
      const rawYear = sortedItems[6].slice(4);
      if (rawYear.length !== 4) {
        return;
      }
      const year = parseInt(rawYear, 10);
      if (isNaN(year)) {
        return;
      }
      if (year < 1920 || year > 2002) {
        return;
      }
    }
    console.log(sortedItems);
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
