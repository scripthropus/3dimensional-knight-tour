import { useState } from "react";
import { ChessBoards } from "./ChessBoards";
import { Position3D, makeTour, knightMoves3D } from "./knightTour";

export const KnightTourVisualization = () => {
  const [tour, setTour] = useState<Position3D[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [validMoves, setValidMoves] = useState<Position3D[]>([]);

  const generateTour = () => {
    const startPos: Position3D = { file: "d", rank: 4, level: "D" };
    const newTour = makeTour(20, startPos);
    setTour(newTour);
    setCurrentStep(0);
    
    // 初期位置から有効な移動先を計算
    if (newTour.length > 0) {
      setValidMoves(knightMoves3D(newTour[0]));
    }
  };

  const handleSquareClick = (position: Position3D) => {
    // 有効な移動先かどうかチェック
    const isValidMove = validMoves.some(
      move => 
        move.file === position.file && 
        move.rank === position.rank && 
        move.level === position.level
    );

    if (isValidMove && currentStep < tour.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // 次のステップの有効な移動先を計算
      if (nextStep < tour.length - 1) {
        setValidMoves(knightMoves3D(tour[nextStep]));
      } else {
        setValidMoves([]);
      }
    }
  };

  return (
    <div>
      <button onClick={generateTour}>ツアーを生成</button>
      
      {tour.length > 0 && (
        <div>
          <div data-testid="current-position">
            現在位置: {tour[currentStep].file}{tour[currentStep].rank}{tour[currentStep].level}
          </div>
          
          <ChessBoards 
            tour={tour} 
            currentStep={currentStep}
            validMoves={validMoves}
            onSquareClick={handleSquareClick}
          />
        </div>
      )}
    </div>
  );
};