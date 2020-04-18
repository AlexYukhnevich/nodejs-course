const router = require('express').Router();
const userRouter = require('../components/users/user.router');
const boardRouter = require('../components/boards/board.router');
const taskRouter = require('../components/tasks/task.router');
const { validateRequest } = require('../errorHandlers/middlewares/validation');

router.use('/users', userRouter);
router.use('/boards', boardRouter);
router.use('/boards/:boardId/tasks', taskRouter);

router.use(validateRequest);

module.exports = router;
