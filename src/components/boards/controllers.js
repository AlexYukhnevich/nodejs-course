const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const boardService = require('./board.service');
const Board = require('./board.model');

const getBoards = async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    return !boards
      ? next(NOT_FOUND)
      : res.status(OK).send(boards.map(Board.sendResponse));
  } catch (err) {
    return next(err);
  }
};

const getBoard = async (req, res, next) => {
  try {
    const board = await boardService.get(req.params.boardId);
    return !board
      ? next(NOT_FOUND)
      : res.status(OK).send(Board.sendResponse(board));
  } catch (err) {
    return next(err);
  }
};

const createBoard = async (req, res, next) => {
  try {
    const board = await boardService.create(req.body);
    res.status(OK).send(Board.sendResponse(board));
  } catch (err) {
    return next(err);
  }
};

const updateBoard = async (req, res, next) => {
  try {
    const board = await boardService.update(req.params.boardId, req.body);
    res.status(OK).send(Board.sendResponse(board));
  } catch (err) {
    return next(err);
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    const board = await boardService.delete(req.params.boardId);
    return !board
      ? next(NOT_FOUND)
      : res.status(NO_CONTENT).send('Board has been successfully deleted');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
