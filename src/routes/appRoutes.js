const router = require('express').Router();
const loginRouter = require('../components/login/login.router');
const userRouter = require('../components/users/user.router');
const boardRouter = require('../components/boards/board.router');
const taskRouter = require('../components/tasks/task.router');
const { errorRequest } = require('../middlewares/validation.middleware');
const auth = require('../middlewares/auth.middleware');

router.use('/login', loginRouter);
router.use('/users', auth, userRouter);
router.use('/boards', auth, boardRouter);
router.use('/boards/:boardId/tasks', auth, taskRouter);

router.use(errorRequest);

module.exports = router;
