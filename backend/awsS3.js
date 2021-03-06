const AWS = require('aws-sdk');

// name of your bucket here
const NAME_OF_BUCKET = 'northrn-flickr';

const multer = require('multer');

//  make sure to set environment variables in production for:
//  AWS_ACCESS_KEY_ID
//  AWS_SECRET_ACCESS_KEY
//  and aws will automatically use those environment variables

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// --------------------------- Public UPLOAD ------------------------

//returns a promise that returns the file URL that you want to save to DB
const singlePublicFileUpload = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require('path');
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);

  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    // added content type to avoid default "application/octet-stream"
    ContentType: `${mimetype}`,
    //ContentDisposition tells browser to download file with the given name instead of viewing file
    // ContentDisposition: 'attachment; filename=some_file_name.jpg',
    Body: buffer,
    ACL: 'public-read',
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};

const multiplePublicFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePublicFileUpload(file);
    })
  );
};

// --------------------------- Private UPLOAD ------------------------

const singlePrivateFileUpload = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require('path');
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Key;
};

const multiplePrivateFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePrivateFileUpload(file);
    })
  );
};

const retrievePrivateFile = (key) => {
  let fileUrl;
  if (key) {
    fileUrl = s3.getSignedUrl('getObject', {
      Bucket: NAME_OF_BUCKET,
      Key: key,
    });
  }
  return fileUrl || key;
};

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

//generates the middleware necessary to convert the data from your form into readable fields and files
const singleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).single(nameOfKey);

const multipleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).array(nameOfKey);

// ------------------------ Delete file from AWS ---------------------------

const awsDeleteFiles = async (...files) => {
  const objects = files.map((file) => {
    return { Key: file };
  });
  const params = {
    Bucket: NAME_OF_BUCKET,
    Delete: {
      Objects: objects,
    },
  };

  return await s3.deleteObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log('delete', data);
  });
};

const deleteSingleFile = async (file) => {
  return await awsDeleteFiles(file);
};

module.exports = {
  s3,
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singlePrivateFileUpload,
  multiplePrivateFileUpload,
  retrievePrivateFile,
  singleMulterUpload,
  multipleMulterUpload,
  awsDeleteFiles,
  deleteSingleFile,
};
