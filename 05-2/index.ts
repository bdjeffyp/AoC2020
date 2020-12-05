import fs from "fs";

interface ISeatAssignmentBsp {
  rowBsp: string;
  columnBsp: string;
}
interface ISeatAssignment {
  row: number;
  column: number;
  seatId: number;
}

// Add each input item into an array
const prepareData = (): string[] => {
  const input = fs.readFileSync("./input.txt").toString();
  return input.split("\n").map((value: string) => value.slice(0, 10));
};

// Split the BSP into two parts: rows, then columns.
const createBspEntries = (rawData: string[]): ISeatAssignmentBsp[] => {
  return rawData.map((entry: string) => {
    return {
      rowBsp: entry.slice(0, 7),
      columnBsp: entry.slice(7, 10),
    } as ISeatAssignmentBsp;
  });
};

// For each entry in the BSP array, determine the row and column
const findEachSeat = (bsps: ISeatAssignmentBsp[]): ISeatAssignment[] => {
  return bsps.map((entry: ISeatAssignmentBsp) => {
    // First traverse the row tree
    const rowBsp = entry.rowBsp;
    let lowRow = 0;
    let highRow = 127;
    let distance = 64;
    for (let i = 0; i < rowBsp.length; i++) {
      if (rowBsp[i] === "F") {
        // Take the lower half, so reduce the high row
        highRow -= distance;
      } else {
        // Take the upper half, so increase the low row
        lowRow += distance;
      }
      // Split the distance
      distance /= 2;
    }
    // Next traverse the column tree
    const columnBsp = entry.columnBsp;
    let lowColumn = 0;
    let highColumn = 8;
    distance = 4;
    for (let i = 0; i < columnBsp.length; i++) {
      if (columnBsp[i] === "L") {
        // Take the lower half, so reduce the high column
        highColumn -= distance;
      } else {
        // Take the upper half, so increase the low column
        lowColumn += distance;
      }
      // Split the distance
      distance /= 2;
    }
    // Get this seat's ID
    const id = lowRow * 8 + lowColumn;
    return {
      row: lowRow,
      column: lowColumn,
      seatId: id,
    } as ISeatAssignment;
  });
};

// Find my seat by looking for the gap
const findMySeat = (seats: ISeatAssignment[]): number => {
  let seatId = seats[0].seatId;
  for (let i = 1; i < seats.length; i++) {
    if (++seatId === seats[i].seatId) {
      continue;
    } else {
      // Found it!
      break;
    }
  }
  return seatId;
};

const data = prepareData();
const seatAssignmentsBsp = createBspEntries(data);
console.log(`Determining my seat ID...`);
const seatAssignments = findEachSeat(seatAssignmentsBsp);
// Sort the seats by ID
seatAssignments.sort((a: ISeatAssignment, b: ISeatAssignment) => a.seatId - b.seatId);
const seatId = findMySeat(seatAssignments);
console.log(`My seat is ${seatId}`);
