const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller');
const { upload } = require('../middlewares/upload');

router.get('/', Controller.List);
router.get('/filtro/:filtro/:valor', Controller.ListByFilter);
router.post('/', upload.single('fotoPerfil'), Controller.Save);
router.get('/:id', Controller.SearchById);
router.put('/:id', Controller.Update);
router.delete('/:id', Controller.Destroy);

module.exports = router;