import fs from "fs";

// Add each input item into an array
const prepareData = (): number[] => {
  const input = fs.readFileSync("./input.txt").toString();
  const data = input.split("\n").map((value: string) => parseInt(value));
  return data.sort((a, b) => a - b);
};

// Compare each element to find the indices that add up to 2020
const findIndices = (data: number[]): number[] | undefined => {
  let i, j: number;
  for (i = 0; i < data.length; i++) {
    for (j = i + 1; j < data.length; j++) {
      if (data[i] + data[j] === 2020) {
        console.log(`i=${i} and j=${j}`);
        return [i, j];
      }
    }
  }
};

console.log(`Finding values that sum to 2020...`);
const data = prepareData();
const indices = findIndices(data);
if (!indices) {
  console.log(`Couldn't find the numbers that sum to 2020. That would be a BUG!`);
} else {
  const x = data[indices[0]],
    y = data[indices[1]];
  console.log(`The product of ${x} and ${y} is '${x * y}'`);
}
