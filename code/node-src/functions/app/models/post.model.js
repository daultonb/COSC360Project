module.exports = (sequelize, Sequelize) => {
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
    genre: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.BLOB('long'),
      get() {
        return this.getDataValue('data')?.toString('utf8');
      },
    }
  }, {
    defaultScope: {
      attributes: { exclude: ['data'] }
    },
    scopes: {
      withMedia: { attributes: {}, }
    }
  });

  return Post;
};