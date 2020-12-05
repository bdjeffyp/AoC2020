import fs from "fs";

// Add each input item into an array
const prepareData = (): string[] => {
  const input = fs.readFileSync("./input.txt").toString();
  return input.split("\n");
};

const mountain = prepareData();

const RIGHT_MOVEMENT = 3;
const DOWN_MOVEMENT = 1;
const MOUNTAIN_WIDTH = mountain[0].length - 1;
console.log(MOUNTAIN_WIDTH);

// Let's do a GAME LOOP!!
// We will start on the top right of the array.
// Each loop will move the player three spots to the right and one row down.
// The loop will end once we reach the last row (i.e. the last entry in the array).
// Each step, we check for a # character. Increment if a # is found.
// If the end of the string is reached, loop back to the start of the string to "extend" the map.
let treesFound = 0;
let position = RIGHT_MOVEMENT;
console.log(`Begin tobogganing down the mountain!!`);
// We move right 3 and down 1, so the first row doesn't matter.
const bottom = mountain.length;
for (let i = 1; i < bottom; i += DOWN_MOVEMENT) {
  console.log(`Row ${i}, position ${position}: Found ${mountain[i].charAt(position)}`);
  // Is there a tree here?
  if (mountain[i].charAt(position) === "#") {
    treesFound++;
  }
  // Move to the right
  position += RIGHT_MOVEMENT;
  // Loop back if we reached the end of the string
  if (position >= MOUNTAIN_WIDTH) {
    position -= MOUNTAIN_WIDTH;
  }
}
console.log(`Trees found: ${treesFound}`);
