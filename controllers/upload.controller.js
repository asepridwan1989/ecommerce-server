const Item = require('../models/item.model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

module.exports = {
    upload: (req, res) => {
      console.log('masuk sini gha?');
        let imgObj = {
            name: req.body.itemName,
            imageUrl: req.file.cloudStoragePublicUrl,
            category: req.body.itemCategory,
            price: req.body.itemPrice,
            quantity: req.body.itemQuantity
        }
        let newItem = new Item (imgObj)
        newItem.save()
            .then(result=>{
              res.status(201).json({
                message: 'successfuly add new item',
                data: result
              })
            })
            .catch(error=>{
              res.status(400).json({
                message: 'failed to add new item'
              })
            })
    },
    getAll(req, res) {
        Item.find()
        .then(items=>{
          res.status(200).json({
            message: 'successfuly add new item',
            data: items
          })
        })
        .catch(error=>{
          res.status(400).json({
            message: 'failed to get item'
          })
        })
    },
    search(req, res){
        const nameQuery = req.query.name
        Item.find({
            name: {
                $regex: '.*' + nameQuery + '.*'
            }
        },(err,name)=>{
            if(err){
                res.status(400).json({
                    message: 'failed to get task'
                })
            }else {
                if(name.length > 0){
                    res.status(200).json({
                        message: 'task was succesfuly got',
                        data: name
                    })
                }else{
                    res.status(200).json({
                        message: 'nothing to show'
                    })
                }
            }
        })
    },
    searchCat(req, res){
        const category = req.query.category
        Item.find({
            category: category
        },(err,name)=>{
            if(err){
                res.status(400).json({
                    message: 'failed to get task'
                })
            }else {
                if(name.length > 0){
                    res.status(200).json({
                        message: 'task was succesfuly got',
                        data: name
                    })
                }else{
                    res.status(200).json({
                        message: 'nothing to show'
                    })
                }
            }
        })
    },
    editItem(req, res){
    const id = mongoose.Types.ObjectId(req.params.id)
    const body = req.body
    Item.findById(id, (err, item) => {
      if(err) {
        res.status(400).json({
          message: err.message
        })
      } else {
        if(item.userId == userId) {
          Item.update({
            _id: id
          }, {
            $set: req.body
          }, {
            overwrite: false
          }, (err, result) => {
            if(err) {
              res.status(400).json({
                message: 'failed to edit item'
              })
            } else {
              res.status(201).json({
                message: 'successfuly edited item',
                data: item
              })
            }
          })
        } else {
          res.status(400).json({
            message: 'Invalid user'
          })
        }
      }
    })
  },

  deleteItem(req, res) {
    const id = mongoose.Types.ObjectId(req.params.id)
    Item.findById(id, (err, item) => {
        if(err) {
            res.status(400).json({
                message: 'item not found'
            })
        } else {
          Item.remove({
              _id: id
          }, (err) => {
              if(err) {
                  console.log('error=====>',err)
                  res.status(400).json({
                      message: 'failed to delete task'
                  })
              } else {
                  console.log('berhasil')
                  // res.status(200).json({
                  //     message: 'task was successfuly deleted',
                  // })
              }
          })
          res.status(400).json({
              message: 'Invalid user'
          })
        }
    })
  }
}
