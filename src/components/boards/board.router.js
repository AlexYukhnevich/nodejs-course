const boardRouter = require('express').Router({ mergeParams: true });

const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  validateBody
} = require('./controllers');

boardRouter
  .route('/')
  .get(getBoards)
  .post(validateBody, createBoard);

boardRouter
  .route('/:boardId')
  .get(getBoard)
  .put(validateBody, updateBoard)
  .delete(deleteBoard);

module.exports = boardRouter;
