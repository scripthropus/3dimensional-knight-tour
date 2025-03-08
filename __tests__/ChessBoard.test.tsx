import { fireEvent, render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import { ChessBoard } from "../src/ChessBoard.tsx";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { knightMoves3D, Position3D } from "../src/knightTour.ts";

it("8x8のマスの表示", () => {
	const mockOnClick = vi.fn();
	const validMoves: Position3D[] = [];

	render(
		<ChessBoard
			level="A"
			onSquareClick={mockOnClick}
			validMoves={validMoves}
		/>,
	);

	const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
	const ranks = [1, 2, 3, 4, 5, 6, 7, 8];

	files.forEach((file) => {
		ranks.forEach((rank) => {
			const squareId = `${file}${rank}`;
			const square = screen.getByText(squareId);
			expect(square).toBeInTheDocument();
		});
	});
});

it("同じ階層でかつ移動可能マスの場合onSquareClickがクリックで呼ばれる", () => {
	const mockOnClick = vi.fn();
	const validMoves: Position3D[] = [
		{ file: "f", rank: 6, level: "E" },
		{ file: "c", rank: 3, level: "E" },
		{ file: "g", rank: 4, level: "F" },
	];
	render(
		<ChessBoard
			level="E"
			onSquareClick={mockOnClick}
			validMoves={validMoves}
		/>,
	);

	fireEvent.click(screen.getByText("f6"));
	expect(mockOnClick).toHaveBeenCalledTimes(1);
	expect(mockOnClick).toHaveBeenCalledWith({
		file: "f",
		rank: 6,
		level: "E",
	});
});

it("移動可能でないマスの場合onSquareClickが呼ばれない", () => {
	const mockOnClick = vi.fn();
	const validMoves: Position3D[] = [{ file: "f", rank: 6, level: "E" }];

	render(
		<ChessBoard
			level="E"
			onSquareClick={mockOnClick}
			validMoves={validMoves}
		/>,
	);

	fireEvent.click(screen.getByText("a1"));
	expect(mockOnClick).not.toHaveBeenCalled();
});

it("違う階層 移動可能マスであればonSquareClickがクリックで呼ばれる", () => {
	const mockOnClick = vi.fn();
	const validMoves: Position3D[] = [
		{ file: "f", rank: 6, level: "E" },
		{ file: "e", rank: 6, level: "G" },
		{ file: "d", rank: 5, level: "C" },
	];

	const { unmount } = render(
		<ChessBoard
			level="E"
			onSquareClick={mockOnClick}
			validMoves={validMoves}
		/>,
	);

	fireEvent.click(screen.getByText("f6"));
	expect(mockOnClick).toHaveBeenCalledTimes(1);
	expect(mockOnClick).toHaveBeenCalledWith({
		file: "f",
		rank: 6,
		level: "E",
	});

	mockOnClick.mockReset();
	unmount();

	render(
		<ChessBoard
			level="G"
			onSquareClick={mockOnClick}
			validMoves={validMoves}
		/>,
	);

	fireEvent.click(screen.getByText("e6"));
	expect(mockOnClick).toHaveBeenCalledTimes(1);
	expect(mockOnClick).toHaveBeenCalledWith({
		file: "e",
		rank: 6,
		level: "G",
	});
});

it("違う階層で移動可能マスでない場合onSquareClickが呼ばれない", () => {
	const mockOnClick = vi.fn();
	const validMoves: Position3D[] = [
		{ file: "f", rank: 6, level: "E" },
		{ file: "e", rank: 6, level: "G" },
	];

	// Cレベルのボードをレンダリング（validMovesにCレベルの移動先はない）
	render(
		<ChessBoard
			level="C"
			onSquareClick={mockOnClick}
			validMoves={validMoves}
		/>,
	);

	// Cレベルの任意のマスをクリック
	fireEvent.click(screen.getByText("d4"));

	// onSquareClickが呼ばれていないことを確認
	expect(mockOnClick).not.toHaveBeenCalled();

	// 別のマスでも試す
	fireEvent.click(screen.getByText("a1"));
	expect(mockOnClick).not.toHaveBeenCalled();
});
