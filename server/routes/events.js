const express = require('express');
const router = express.Router();

router.use(express.json());

const {
    registerEvent,
    getEvents,
    getDetail,
    removeEvent

} = require('../controller/EventController');

router.get('/', getEvents);
router.get('/:id', getDetail)
router.post('/', registerEvent);
router.delete('/:id', removeEvent);
module.exports = router;