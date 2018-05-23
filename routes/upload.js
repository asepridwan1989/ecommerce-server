const express = require('express');
const router = express.Router();
const images = require('../helper/images')
const { upload, getAll, search, searchCat, deleteItem, editItem } = require('../controllers/upload.controller')
const { isAdmin } = require('../middleware/auth')

router
  .post('/',
    isAdmin,
    images.multer.single('image'),
    images.sendUploadToGCS,
    upload
  )
  .get('/', getAll)
  .get('/search', search)
  .get('/searchCat', searchCat)
  .put('/:id', isAdmin, editItem)
  .delete('/:id', isAdmin, deleteItem)


module.exports = router;
