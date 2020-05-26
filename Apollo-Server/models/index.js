const user = require('./User');
const stokturu = require('./stokturu');
// const images = require('./stokturu');
const birim = require('./birim');
const varyant = require('./varyant');
const varyantValue = require('./varyantValue');
const varyant_skus = require('./varyant_skus');
const photo = require('./photo');
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
    user,
    ...stokturu,
    birim,
    varyant,
    varyantValue,
    varyant_skus,
    photo,
    UploadType,
    // images
    //  file
};