const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const boardService = require('./board.service');
const Board = require('./board.model');
const catchError = require('../../middlewares/catch-error.middleware');

const getBoards = catchError(async (req, res, next) => {
  const boards = await boardService.getAll();
  return !boards
    ? next(NOT_FOUND)
    : res.status(OK).send(boards.map(Board.sendResponse));
});

const getBoard = catchError(async (req, res, next) => {
  const board = await boardService.get(req.params.boardId);
  return !board
    ? next(NOT_FOUND)
    : res.status(OK).send(Board.sendResponse(board));
});

// eslint-disable-next-line no-unused-vars
const createBoard = catchError(async (req, res, next) => {
  const board = await boardService.create(req.body);
  res.status(OK).send(Board.sendResponse(board));
});

// eslint-disable-next-line no-unused-vars
const updateBoard = catchError(async (req, res, next) => {
  const board = await boardService.update(req.params.boardId, req.body);
  res.status(OK).send(Board.sendResponse(board));
});

const deleteBoard = catchError(async (req, res, next) => {
  const board = await boardService.delete(req.params.boardId);
  return !board
    ? next(NOT_FOUND)
    : res.status(NO_CONTENT).send('Board has been successfully deleted');
});

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
