const User = require('./User');
const stokturu = require('./stokturu');
// const images = require('./stokturu');
const birim = require('./birim');
const varyant = require('./varyant');
const varyantValue = require('./varyantValue');
const varyant_skus = require('./varyant_skus');
const sepet = require('./sepet');
const photo = require('./photo');
const guest_user = require('./guest_user');
const User_detail = require('./User_detail');
const siparis = require('./siparis');

const { GraphQLUpload } = require('graphql-upload')
// const file = require('./File');
const {
    GraphQLObjectType,
    GraphQLString
  } = require('graphql');
  
  const UploadType = new GraphQLObjectType({
    name: 'UploadType',
    fields: () => ({
      Upload: GraphQLUpload,
      filename: {
        type: GraphQLString
      },
      mimetype: {
        type: GraphQLString
      },
      encoding: {
        type: GraphQLString
      }
    })
  });
  
  
module.exports = {
    Upload: GraphQLUpload,
    User,
    ...stokturu,
    birim,
    varyant,
    varyantValue,
    varyant_skus,
    sepet,
    guest_user,
    User_detail,
    photo,
    siparis,
    UploadType,
    // images
    //  file
};