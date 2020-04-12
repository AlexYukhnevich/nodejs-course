const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');
const boardService = require('./board.service');
const Board = require('./board.model');

const getBoards = async (req, res, next) => {
  const boards = await boardService.getAll();
  if (!boards) {
    res.info = NOT_FOUND;
  } else {
    res.info = OK;
    res.payload = boards.map(Board.sendResponse);
  }
  next();
};

const getBoard = async (req, res, next) => {
  const board = await boardService.get(req.params.boardId);
  if (!board) {
    res.info = NOT_FOUND;
  } else {
    res.info = OK;
    res.payload = Board.sendResponse(board);
  }
  next();
};

const createBoard = async (req, res, next) => {
  const board = await boardService.create(req.body);
  res.info = OK;
  res.payload = Board.sendResponse(board);
  next();
};

const updateBoard = async (req, res, next) => {
  const board = await boardService.update(req.params.boardId, req.body);
  res.info = OK;
  res.payload = Board.sendResponse(board);
  next();
};

const deleteBoard = async (req, res, next) => {
  const board = await boardService.delete(req.params.boardId);
  if (!board) {
    res.info = NOT_FOUND;
  } else {
    res.info = NO_CONTENT;
    res.payload = { message: 'Board has been successfully deleted' };
  }
  next();
};

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
