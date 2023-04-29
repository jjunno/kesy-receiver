const knex = require('../knex.js');
const fs = require('fs');

/**
 * @param {*} uuid
 * @param {*} latitude  like 64.0587817
 * @param {*} longitude like 24.5404323
 * @param {*} accuracy  like 8760.516262481686
 */
function Trash(uuid, latitude, longitude, accuracy, base64) {
  this.table = 'trashes';
  this.uuid = uuid;
  this.latitude = latitude;
  this.longitude = longitude;
  this.accuracy = accuracy;
  this.encodedImage = base64;

  // Makes sure the accuracy fits the db
  if (parseInt(this.accuracy) > 9999) this.accuracy = 9999;
  if (this.accuracy != null) this.accuracy = this.accuracy.toFixed(2);
}

/**
 * @returns {object}
 */
Trash.prototype.create = async function () {
  console.log(`Create row ${this.uuid}`);
  try {
    const row = await knex(this.table).insert({
      uuid: this.uuid,
      latitude: this.latitude,
      longitude: this.longitude,
      accuracy: this.accuracy,
      updatedAt: knex.fn.now(),
      createdAt: knex.fn.now(),
    });
    this.base64ToImage(this.uuid);
    return await this.findById(row[0]);
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @returns {object}
 */
Trash.prototype.updateLocationData = async function () {
  console.log(`Update row ${this.uuid} location data`);

  try {
    await knex(this.table).where({ uuid: this.uuid }).update({
      latitude: this.latitude,
      longitude: this.longitude,
      accuracy: this.accuracy,
      updatedAt: knex.fn.now(),
    });
    return await this.findByUuid(this.uuid);
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * @param {*} uuid
 * @returns {object}
 */
Trash.prototype.findById = async function (id) {
  console.log(`Select trash ${id}`);
  return await knex(this.table).where({ id: id }).first();
};

/**
 * @param {*} uuid
 * @returns {object}
 */
Trash.prototype.findByUuid = async function (uuid) {
  console.log(`Select trash ${uuid}`);
  return await knex(this.table).where({ uuid: uuid }).first();
};

/**
 * Decode base64 string to image, then save it into storage/images.
 */
Trash.prototype.base64ToImage = function () {
  const buffer = Buffer.from(this.encodedImage, 'base64');
  fs.writeFileSync(`storage/images/${this.uuid}.jpg`, buffer);
};

module.exports = Trash;
