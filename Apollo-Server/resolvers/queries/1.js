const Quer = require('./Query');
const kategori = require('./kategori');
const varyantQuery = require('./varyantQuery');
const Query = {
  ...Quer,
  ...kategori,
  ...varyantQuery,
  
};
module.exports = Query;