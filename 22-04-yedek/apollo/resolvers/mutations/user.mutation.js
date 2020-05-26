module.exports = {
  // createUser: async (parent, { data: { username, lastname , password }},{ User }) => {
  //   const user = await User.findOne({ username });
  //
  //   if(user){
  //     throw new Error('Kullanıcı adı kullanımda')
  //   }
  //   return await new User({
  //     username,
  //     lastname,
  //     password
  //   }).save((error)=>{
  //     if(error){
  //       throw error;
  //     }
  //   });
  // },
  createUser: async (parent, {  username},{ User }) => {
    const user = await User.findOne({ username });

    if(user){
      throw new Error('Kullanıcı adı kullanımda')
    }
    return await new User({
      username,
      lastname,
      password
    }).save((error)=>{
      if(error){
        throw error;
      }
    });
  },
};
