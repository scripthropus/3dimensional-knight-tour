export type Position3D = {
	file: Files;
	rank: Ranks;
	level: Levels;
}

type Files = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type FileIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type Ranks = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type RankIndex =  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type Levels = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type LevelIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type KnightMove3DIndex = readonly [FileIndex, RankIndex, LevelIndex];
type KnightMove2DIndex = [FileIndex, RankIndex] | [FileIndex, LevelIndex] | [RankIndex, LevelIndex];

type KnightPatterns = [1,2] | [1,-2] | [2,1] | [2,-1] | [-1,2] | [-1,-2] | [-2,1] | [-2,-1];
const knightPatterns: KnightPatterns[] = [[1,2], [1,-2], [2,1], [2,-1], [-1,2], [-1,-2], [-2,1], [-2,-1]];

const files: Files[] = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const ranks: Ranks[] = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const levels: Levels[] = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;


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

/*
export function makeTour(steps: number, startPos: Position) {
	const tour: Position[] = [startPos];

	while (tour.length < steps) {
		const currentPos = tour[tour.length - 1];
		const possibleMoves = knightMoves(currentPos).filter(
			(move) => !tour.includes(move),
		);

		if (possibleMoves.length === 0) {
			break;
		}

		const rand = Math.floor(Math.random() * possibleMoves.length);
		const nextMove = possibleMoves[rand];

		const futureMovesAvailable = knightMoves(nextMove).some(
			(move) => !tour.includes(move) && move !== nextMove,
		);

		if (!futureMovesAvailable) {
			continue;
		}

		tour.push(nextMove);
	}

	return tour;
}
*/
