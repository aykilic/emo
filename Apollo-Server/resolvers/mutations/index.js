const user = require('./user.mutation');
const stokturu = require('./stokturu.mutation');
const birim = require('./birim.mutation');
const varyant = require('./varyant.mutation');
const sepet = require('./sepet.mutation');
const siparis=require('./siparis.mutation');
const sayfa=require('./sayfa.mutation');
//  const photo = require('./photo.mutation');
const Mutation = {
  ...user,
  ...birim,
  ...stokturu,
  ...varyant,
  ...sepet,
  ...siparis,
  ...sayfa,
  // ...photo
};
module.exports = Mutation;
