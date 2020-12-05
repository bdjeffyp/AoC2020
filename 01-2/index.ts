import fs from "fs";

// Add each input item into an array
const prepareData = (): number[] => {
  const input = fs.readFileSync("./input.txt").toString();
  const data = input.split("\n").map((value: string) => parseInt(value));
  return data.sort((a, b) => a - b);
};

// Compare each element to find the indices that add up to 2020
const findIndices = (data: number[]): number[] | undefined => {
  let i, j, k: number;
  for (i = 0; i < data.length; i++) {
    for (j = i + 1; j < data.length; j++) {
      for (k = j + 1; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === 2020) {
          console.log(`i=${i} and j=${j} and k=${k}`);
          return [i, j, k];
        }
      }
    }
  }
};

console.log(`Finding three values that sum to 2020...`);
const data = prepareData();
const indices = findIndices(data);
if (!indices) {
  console.log(`Couldn't find the numbers that sum to 2020. That would be a BUG!`);
} else {
  const x = data[indices[0]],
    y = data[indices[1]],
    z = data[indices[2]];
  console.log(`The product of ${x}, ${y}, and ${z} is '${x * y * z}'`);
}
