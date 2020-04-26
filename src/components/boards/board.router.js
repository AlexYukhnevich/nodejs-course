const boardRouter = require('express').Router({ mergeParams: true });
const { validateBoard } = require('../../middlewares/validation.middleware');
const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
} = require('./board.controllers');

boardRouter
  .route('/')
  .get(getBoards)
  .post(validateBoard, createBoard);

boardRouter
  .route('/:boardId')
  .get(getBoard)
  .put(validateBoard, updateBoard)
  .delete(deleteBoard);

module.exports = boardRouter;
