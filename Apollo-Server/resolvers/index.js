// query resolvers
const Query = require('./queries/Query');
const kategori = require('./queries/kategori');
const yorumlar = require('./queries/yorumlar');
const varyantkategori = require('./queries/varyantkategori');
const { GraphQLUpload } = require('graphql-upload')
// const Upload = require ('./upload');
// const birimList = require('./queries/birimQuery');
// mutation resolvers
const Mutation = require('./mutations/index');
const Subscription = require('./subscriptions/index');
module.exports = {
  Upload: GraphQLUpload,
  Query,
  kategori,
  yorumlar,
  
  varyantkategori,
  Mutation,
  Subscription
  // Upload
};
