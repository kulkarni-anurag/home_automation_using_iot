const express = require('express');
const router = express.Router();
const Devices = require('../models/devices_model');

router.get('/index', (req,res) => {
    res.render('devices');
})

router.get('/', (req,res) => {
    Devices.find()
      .then((devices) => res.json(devices))
      .catch((err) => res.status(400).json("Error: "+err));
})

router.get('/:id', (req,res) => {
    Devices.findOne({ _id: req.params.id })
	    .then((device) => res.json(device.dstatus))
	    .catch((err) => res.status(400).json("Error: "+err));
})

router.post('/add', (req,res) => {
    const newDevice = new Devices({
        dname: req.body.dname
    });
    newDevice.save()
        .then(() => res.json("Device Added"))
        .catch((err) => res.status(400).json("Error: "+err));
})

router.post('/update/:id', (req,res) => {
    Devices.updateOne(
      { _id: req.params.id},
      { dstatus: Number(req.body.status) }
    )
      .then(() => res.json("Device Status Updated"))
      .catch((err) => res.status(400).json("Error: "+err));
})

router.delete('/:id', (req,res) => {
    Devices.deleteOne({ _id: req.params.id })
      .then(() => res.json("Device Deleted"))
      .catch((err) => res.status(400).json("Error: "+err));
})

module.exports = router;