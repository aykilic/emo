module.exports={
    newsiparis: {
        subscribe:(parent,args,{pubsub}) => pubsub.asyncIterator('newsiparis')
    }
}