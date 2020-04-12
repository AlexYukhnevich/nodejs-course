const boardRouter = require('express').Router({ mergeParams: true });
const { validateBoard } = require('../../errorHandlers/middlewares/validation');
const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
} = require('./controllers');

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
