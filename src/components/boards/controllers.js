const boardService = require('./board.service');
const Board = require('./board.model');
const Column = require('../column/column.model');
// const columns = [
//   { title: 'To Do', order: 0 },
//   { title: 'In Progres', order: 1 },
//   { title: 'Done', order: 2 }
// ];
const getBoards = async (req, res) => {
  const boards = await boardService.getAll();
  console.log(boards);
  res.json(boards.map(Board.sendResponse));
};

const getBoard = async (req, res) => {
  const board = await boardService.getBoard(req.params.boardId);
  console.log(board);
  return board
    ? res.json(Board.sendResponse(board))
    : res.status(404).send({ message: 'Board not found' });
};

// Need to finish implementation
const createBoard = async (req, res) => {
  const { title, columns } = req.body;
  const boards = await boardService.getAll();
  const newBoard = new Board({
    title,
    columns: columns.map(data => new Column(data))
  });
  const board = boards.find(b => b.title === newBoard.title);
  if (!board) {
    await boardService.createBoard(boards, newBoard);
    return res.json({
      message: 'Board was added',
      body: Board.sendResponse(newBoard)
    });
  }
  res.status(400).send({ message: 'Bad request' });
};

// Need to finish this implementation
const updateBoard = async (req, res) => {
  const { title, columns } = req.body;
  const boards = await boardService.getAll();
  const board = await boardService.getBoard(req.params.boardId);
  if (board) {
    const updateBoardData = {
      id: req.params.boardId,
      title,
      columns: columns.map(data => new Column(data))
    };
    await boardService.updateBoard(boards, updateBoardData);
    return res.json({
      message: 'Board was updated',
      body: Board.sendResponse(updateBoardData)
    });
  }
  return res.status(400).send({ message: 'Bad request' });
};

const deleteBoard = async (req, res, next) => {
  const boards = await boardService.getAll();
  const board = await boardService.getBoard(req.params.boardId);
  if (board) {
    await boardService.deleteBoard(boards, req.params.boardId);
    return next();
    // return res.status(204).send('The board has been deleted');
  }
  res.status(404).send({ message: 'Board not found' });
};

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
