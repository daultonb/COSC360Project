module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    post_id: {
      type: Sequelize.INTEGER
    },
    text: {
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

  return Comment;
};
