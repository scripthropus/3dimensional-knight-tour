import { render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import { ChessBoards } from "../src/ChessBoards";
import { ranks, files, levels } from "../src/knightTour.ts";
import React from "react";
import "@testing-library/jest-dom/vitest";

it("各ボードに正しいレベルが割り当てられている", () => {
	render(<ChessBoards />);

	levels.forEach((level) => {
		expect(screen.getByText(`Level ${level}`)).toBeInTheDocument();
		//expect(screen.getByTestId(`chess-board-${level}`)).toBeInTheDocument();
	});
});
