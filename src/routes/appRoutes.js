const router = require('express').Router();
const authRouter = require('../components/auth/auth.router');
const userRouter = require('../components/users/user.router');
const boardRouter = require('../components/boards/board.router');
const taskRouter = require('../components/tasks/task.router');
const auth = require('../middlewares/auth.middleware');
const { errorRequest } = require('../middlewares/validation.middleware');

router.use('/login', authRouter);
router.use('/users', auth, userRouter);
router.use('/boards', auth, boardRouter);
router.use('/boards/:boardId/tasks', auth, taskRouter);

router.use(errorRequest);

module.exports = router;
