import fs from "fs";

interface ISeatAssignmentBsp {
  rowBsp: string;
  columnBsp: string;
}
interface ISeatAssignment {
  row: number;
  column: number;
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
    return {
      row: lowRow,
      column: lowColumn,
    } as ISeatAssignment;
  });
};

// Calculate the seat id and return the highest one
const getHighestSeatId = (seats: ISeatAssignment[]): number => {
  let seatId = 0;

  seats.forEach((seat: ISeatAssignment) => {
    const thisId = seat.row * 8 + seat.column;
    if (thisId > seatId) {
      seatId = thisId;
    }
  });

  return seatId;
};

const data = prepareData();
const seatAssignmentsBsp = createBspEntries(data);
console.log(`Determining the largest seat ID...`);
const seatAssignments = findEachSeat(seatAssignmentsBsp);
const seatId = getHighestSeatId(seatAssignments);
console.log(`The highest seat ID is ${seatId}`);
