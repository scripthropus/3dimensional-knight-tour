import { render, screen,  } from '@testing-library/react';
import { it, expect } from 'vitest';
import { ChessBoards } from '../src/ChessBoards';
import React from 'react';
import "@testing-library/jest-dom/vitest";


it('各ボードに正しいレベルが割り当てられている', () => {
render(<ChessBoards />);
const levels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

levels.forEach(level => {
    const boardTitle = screen.getByText(`Level ${level}`);
    expect(boardTitle).toBeInTheDocument();
});
});

