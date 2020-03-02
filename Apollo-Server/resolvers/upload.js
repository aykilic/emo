module.exports = {
    upload: async (parent, args, context)=>{
      return await context.Models.User.findById(args._id);
    },
    
  };
  