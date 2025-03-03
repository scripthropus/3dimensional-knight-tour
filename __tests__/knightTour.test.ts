import { it, expect } from 'vitest';
import { knightMoves3D, Position3D, makeTour } from '../src/knightTour.ts';

it('a1A moves', () => {
const position: Position3D = { file: "a", rank: 1, level: "A" };
const result = knightMoves3D(position);
const expected = [
    { file: "b", rank: 3, level: "A" },//(1,2,0)
    { file: "c", rank: 2, level: "A" },//(2,1,0)
    { file: "a", rank: 2, level: "C" },//(0,1,2)
    { file: "a", rank: 3, level: "B" },//(0,2,1)
    { file: "b", rank: 1, level: "C" },//(1,0,2)
    { file: "c", rank: 1, level: "B" },//(2,0,1)
];

expect(result.length).toBe(expected.length);
expected.forEach((move) => {
    expect(result).toContainEqual(move);
});
});

it('e5E moves', () => {
const position: Position3D = { file: "e", rank: 5, level: "E" };
const result = knightMoves3D(position);

const expected = [
  //
  { file: 'f', rank: 7, level: 'E' },//(1,2,0)
  { file: 'f', rank: 3, level: 'E' },//(1,-2,0)
  { file: 'g', rank: 6, level: 'E' },//(2,1,0)
  { file: 'g', rank: 4, level: 'E' },//(2,-1,0)
  { file: 'd', rank: 7, level: 'E' },//(-1,2,0)
  { file: 'd', rank: 3, level: 'E' },//(-1,-2,0)
  { file: 'c', rank: 6, level: 'E' },//(-2,1,0)
  { file: 'c', rank: 4, level: 'E' },//(-2,-1)
  //
  { file: 'e', rank: 6, level: 'G' },//(0,1,2)
  { file: 'e', rank: 6, level: 'C' },//(0,1,-2)
  { file: 'e', rank: 7, level: 'F' },//(0,2,1)
  { file: 'e', rank: 7, level: 'D' },//(0,2,-1)
  { file: 'e', rank: 4, level: 'G' },//(0,-1,2)
  { file: 'e', rank: 4, level: 'C' },//(0,-1,-2)
  { file: 'e', rank: 3, level: 'F' },//(0,-2,1)
  { file: 'e', rank: 3, level: 'D' },//(0,-2,-1)
  //
  { file: 'f', rank: 5, level: 'G' },//(1,0,2)
  { file: 'f', rank: 5, level: 'C' },//(1,0,-2)
  { file: 'g', rank: 5, level: 'F' },//(2,0,1)
  { file: 'g', rank: 5, level: 'D' },//(2,0,-1)
  { file: 'd', rank: 5, level: 'G' },//(-1,0,2)
  { file: 'd', rank: 5, level: 'C' },//(-1,0,-2)
  { file: 'c', rank: 5, level: 'F' },//(-2,0,1)
  { file: 'c', rank: 5, level: 'D' }//(-2,0,-1)
];


expect(result.length).toBe(expected.length);
expected.forEach((move) => {
    expect(result).toContainEqual(move);
});
});

it('スタート位置が指定した位置になっているか', () => {
const startPos: Position3D = { file: 'd', rank: 4, level: 'D' };
const tour = makeTour(10, startPos);

expect(tour[0]).toEqual(startPos);
});

it('指定した長さのツアーになっているか', () => {
const startPos: Position3D = { file: 'e', rank: 5, level: 'E' };
const steps = 20;
const tour = makeTour(steps, startPos);

expect(tour.length).toBeLessThanOrEqual(steps);
});

it('ナイトの動きに沿ったツアーが生成されているか', () => {
const startPos: Position3D = { file: 'c', rank: 3, level: 'C' };
const tour = makeTour(15, startPos);

for (let i = 1; i < tour.length; i++) {
    const prevPos = tour[i - 1];
    const currentPos = tour[i];
    const validMoves = knightMoves3D(prevPos);
    
    const isValidMove = validMoves.some(move => 
    move.file === currentPos.file && 
    move.rank === currentPos.rank && 
    move.level === currentPos.level
    );
    
    expect(isValidMove).toBeTruthy();
}
});

it('同じ位置を通らない', () => {
const startPos: Position3D = { file: 'b', rank: 2, level: 'B' };
const tour = makeTour(30, startPos);

const uniquePositions = new Set();
let allUnique = true;

for (const pos of tour) {
    const posKey = `${pos.file}-${pos.rank}-${pos.level}`;
    if (uniquePositions.has(posKey)) {
    allUnique = false;
    break;
    }
    uniquePositions.add(posKey);
}

expect(allUnique).toBeTruthy();
expect(uniquePositions.size).toEqual(tour.length);
});

