const express = require('express');
const router = express.Router();
const Devices = require('../models/devices_model');

router.get('/', (req,res) => {
    Devices.find()
        .then((devices) => res.json(devices))
        .catch((err) => res.status(400).json("Error: "+err));
})

router.get('/:id', (req,res) => {
    Devices.findOne({ _id: req.params.id })
	.then((device) => res.json(device))
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
      { dstatus: Number(req.body.status)}
    )
      .then(() => res.json("Device Status Updated"))
      .catch((err) => res.status(400).json("Error: "+err));
})

module.exports = router;
