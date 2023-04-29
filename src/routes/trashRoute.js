const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Trash = require('../prototypes/trash');
require('dotenv').config();

/**
 * Create new trash
 */
router.post('/', auth, async (req, res) => {
  if (!req.body.uuid) {
    return res.status(400).json({ message: 'Property uuid is required' });
  }

  const trash = new Trash(
    req.body.uuid,
    req.body.latitude,
    req.body.longitude,
    req.body.accuracy
  );
  const affect = await trash.create();

  return res.status(200).json(affect);
});

/**
 * Update trash location data
 */
router.put('/', auth, async (req, res) => {
  if (!req.body.uuid) {
    return res.status(400).json({ message: 'Property uuid is required' });
  }

  const trash = new Trash(
    req.body.uuid,
    req.body.latitude,
    req.body.longitude,
    req.body.accuracy
  );
  const affect = await trash.updateLocationData();

  return res.status(200).json(affect);
});

module.exports = router;
