export type Position3D = {
	file: Files;
	rank: Ranks;
	level: Levels;
}

export type Files = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type FileIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Ranks = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type RankIndex =  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Levels = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
export type LevelIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type KnightMove3DIndex = readonly [FileIndex, RankIndex, LevelIndex];
type KnightMove2DIndex = [FileIndex, RankIndex] | [FileIndex, LevelIndex] | [RankIndex, LevelIndex];

type KnightPatterns = [1,2] | [1,-2] | [2,1] | [2,-1] | [-1,2] | [-1,-2] | [-2,1] | [-2,-1];
const knightPatterns: KnightPatterns[] = [[1,2], [1,-2], [2,1], [2,-1], [-1,2], [-1,-2], [-2,1], [-2,-1]];

export const files: Files[] = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export const ranks: Ranks[] = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export const levels: Levels[] = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;


export function knightMoves3D(pos: Position3D): Position3D[] {
  const fileIndex = files.indexOf(pos.file) as FileIndex;
  const rankIndex = ranks.indexOf(pos.rank) as RankIndex;
  const levelIndex = levels.indexOf(pos.level) as LevelIndex;

  const fr = [fileIndex, rankIndex];
  const rl = [rankIndex, levelIndex];
  const fl = [fileIndex, levelIndex];


  const frPatterns = knightPatterns.map(([dx, dy]) => [fr[0] + dx, fr[1] + dy]);
  const frMoves = frPatterns.filter(([x, y]) => x>=1 && x<=7 && y>=1 && y<=7) as KnightMove2DIndex[];
  const frMoves3D:KnightMove3DIndex[] = frMoves.map(([f, r]) => ([f,r,levelIndex]));

  const rlPatterns =  knightPatterns.map(([dx, dy]) => [rl[0] + dx, rl[1] + dy]);
  const rlMoves = rlPatterns.filter(([x, y]) => x>=1 && x<=7 && y>=1 && y<=7) as KnightMove2DIndex[];
  const rlMoves3D:KnightMove3DIndex[] = rlMoves.map(([r, l]) => ([fileIndex,r,l]));

  const flPatterns =  knightPatterns.map(([dx, dy]) => [fl[0] + dx, fl[1] + dy]);
  const flMoves = flPatterns.filter(([x, y]) => x>=1 && x<=7 && y>=1 && y<=7) as KnightMove2DIndex[];
  const flMoves3D:KnightMove3DIndex[] = flMoves.map(([f, l]) => ([f,rankIndex,l]));

  const allMoves:KnightMove3DIndex[] = [frMoves3D, rlMoves3D, flMoves3D].flat();
  
  const allPoisons: Position3D[] = allMoves.map(([f,r,l]) => ({ file: files[f], rank: ranks[r], level: levels[l] }));

  return allPoisons; 
}

function isSamePosition(pos1: Position3D, pos2: Position3D): boolean {
  return pos1.file === pos2.file && 
         pos1.rank === pos2.rank && 
         pos1.level === pos2.level;
}

export function makeTour(steps: number, startPos: Position3D) {
  const tour: Position3D[] = [startPos];
  
  while (tour.length < steps) {
    const currentPos = tour[tour.length - 1];
    const possibleMoves = knightMoves3D(currentPos).filter(
      (move) => !tour.some(pos => isSamePosition(pos, move))
    );
    
    if (possibleMoves.length === 0) {
      break;
    }
    
    const rand = Math.floor(Math.random() * possibleMoves.length);
    const nextMove = possibleMoves[rand];
    
	//次の手で行先が残っているかどうか
    const futureMovesAvailable = knightMoves3D(nextMove).some(
      (move) => !tour.some(pos => isSamePosition(pos, move)) && !isSamePosition(move, nextMove)
    );
    
    if (!futureMovesAvailable) {
      continue;
    }
    
    tour.push(nextMove);
  }
  
  return tour;
}
