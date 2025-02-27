import { it, expect } from 'vitest';
import { knightMoves3D, Position3D } from '../src/knightTour.ts';

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
