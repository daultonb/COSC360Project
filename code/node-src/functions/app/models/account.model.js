module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      admin: {
        type: Sequelize.BOOLEAN
      },
      avatar: {
        type: Sequelize.BLOB('long'),
        get() {
          return this.getDataValue('avatar')?.toString('utf8');
        },
      }
    }, {
      defaultScope: {
        attributes: { exclude: ['password'] }
      },
      scopes: {
        withPassword: { attributes: {}, }
      }
    });
  
    return Account;
};
