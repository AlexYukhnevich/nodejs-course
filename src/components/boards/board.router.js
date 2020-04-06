const boardRouter = require('express').Router({ mergeParams: true });

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
  .post(createBoard);

boardRouter
  .route('/:boardId')
  .get(getBoard)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = boardRouter;
