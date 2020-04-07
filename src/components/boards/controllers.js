const boardService = require('./board.service');
const Board = require('./board.model');

const validateBody = (req, res, next) => {
  const { title, columns } = req.body;
  if (!title || (!columns && !Array.isArray(columns))) {
    console.error('Invalid request body');
    return res.sendStatus(400);
  }
  next();
};

const getBoards = async (req, res) => {
  const boards = await boardService.getAll();
  return !boards
    ? res.sendStatus(404)
    : res.json(boards.map(Board.sendResponse));
};

const getBoard = async (req, res) => {
  const board = await boardService.get(req.params.boardId);
  return !board ? res.sendStatus(404) : res.json(Board.sendResponse(board));
};

const createBoard = async (req, res) => {
  const board = await boardService.create(req.body);
  res.json(Board.sendResponse(board));
};

const updateBoard = async (req, res) => {
  const board = await boardService.update(req.params.boardId, req.body);
  return !board ? res.sendStatus(400) : res.json(Board.sendResponse(board));
};

const deleteBoard = async (req, res) => {
  const board = await boardService.delete(req.params.boardId);
  return !board ? res.sendStatus(404) : res.sendStatus(200);
};

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  validateBody
};
