# KESY

KESY, kesy, "Keruusysteemi", "pickup system".
A personal project that consists of multiple repositories.

User (me) picks up a trash with a reacher/grabber. The device takes a picture of the trash and uploads it to server along with location data and climate data.

The device = Raspberry Pi with camera module, Sense Hat.

# kesy-receiver

One of KESY repositories.

The repository serves a Node.js Express REST API server, which should be used by the device. It is also referred as a "master server" or "server" in other project repositories.

This is the repository that saves the data to the master database. However, this does not have any methods or endpoints to GET data from the database.

### POST new Trash

```
POST {{host}}/api/v1/trash

{
    "uuid": "str(36) unique",
    "accuracy": "decimal(6,2) nullable",
    "latitude": "decimal(10, 8) nullable",
    "longitude": "decimal(11,8) nullable",
    "encodedImage": "base64 nullable"
}
```

Should be accessed from the Python that controls the camera.
Creates a new row to the master database. Also saves the image to `storage/images`.

New row = a new collected trash.

### PUT location data

```
PUT {{host}}/api/v1/trash

{
    "uuid": "str(36) unique",
    "accuracy": "decimal(6,2) nullable",
    "latitude": "decimal(10, 8) nullable",
    "longitude": "decimal(11,8) nullable",
}
```

Should be accessed from the kesy-rpi1ClientAccess.
Updates the given UUID row location data.

# Install

```
npm install
mkdir storage/images
touch src/knexfile.js
```

## .env

```
NODE_ENV=development
PORT=3000

RPI1_USERNAME=foo
RPI1_PASSWORD=bar
```

## knexfile.js

```
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'username',
      password: 'password',
      database: 'database',
      dateStrings: true,
      typeCast: function (field, next) {
        if (field.type == 'TINY' && field.length == 1) {
          return field.string() == '1'; // 1 = true, 0 = false
        }
        return next();
      },
    },
  },
};

```

## Usage

```
node src/server.js
```
