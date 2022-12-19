const router = require('express').Router();
const { getIdeas, getSoloIdea, createIdea, updateIdea, deleteIdea, addInput, deleteInput } = require('../../controllers/ideasController');

router.route('/').get(getIdeas).all(createIdea);


router.route('/:ideaId')
    .get(getSoloIdea)
    .put(updateIdea)
    .delete(deleteIdea);


router.route(`/:ideaId/input`).post(addInput);


router.route(`/:ideaId/input/:inputId`).delete(deleteInput);

module.exports = router;