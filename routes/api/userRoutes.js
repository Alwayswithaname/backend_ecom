const router = require('express').Router();
const { getUsers, getSoloUser, creatUser, updateUser, deletUser, addFriend, deleteFriend } = require('../../controllers/userController');

router.use('/').get(getUsers).all(creatUser);

router.route('/:userId')
    .get(getSoloUser)
    .put(updateUser)
    .delete(deletUser);


router.route('/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);
module.exports = router;