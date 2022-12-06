const router = require('express').Router();
const { getIdeas, getSoloIdea, creatIdea, updateIdea, deleteIdea, addInput, deleteInput } = require('../../controllers/ideaController');

router.route('/').get(getIdeas).all(creatIdea);


router.route('/:ideaId')
    .get(getSoloIdea)
    .put(updateIdea)
    .delete(deleteIdea);


router.route(`/:ideaId/input`).post(addInput);


router.route(`/:ideaId/input/:inputId`).delete(deleteInput);

module.exports = router;