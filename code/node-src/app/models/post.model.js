module.exports = (sequelize, Sequelize) => {
    //This is the DB structure :)
    const Post = sequelize.define("post", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      }
    });
  
    return Post;
};
