module.exports = (sequelize, Sequelize) => {
    //This is the DB structure :)
    const Post = sequelize.define("post", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      username: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.BLOB('long'),
        get() {
          return this.getDataValue('data')?.toString('utf8');
        },
      }
    });
  
    return Post;
};
