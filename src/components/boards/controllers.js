const boardService = require('./board.service');
const Board = require('./board.model');
const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

const getBoards = async (req, res, next) => {
  const boards = await boardService.getAll();
  return !boards
    ? next(NOT_FOUND)
    : res.status(OK).json(boards.map(Board.sendResponse));
};

const getBoard = async (req, res, next) => {
  const board = await boardService.get(req.params.boardId);
  return !board
    ? next(NOT_FOUND)
    : res.status(OK).json(Board.sendResponse(board));
};

const createBoard = async (req, res) => {
  const board = await boardService.create(req.body);
  res.status(OK).json(Board.sendResponse(board));
};

const updateBoard = async (req, res) => {
  const board = await boardService.update(req.params.boardId, req.body);
  res.status(OK).json(Board.sendResponse(board));
};

const deleteBoard = async (req, res, next) => {
  const board = await boardService.delete(req.params.boardId);
  return !board ? next(NOT_FOUND) : res.status(NO_CONTENT);
};

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
