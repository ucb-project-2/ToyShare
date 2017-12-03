module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Giving the User model a name of type STRING
    poster_name: DataTypes.STRING
  });

  User.associate = (models) => {
    // Associating User with Posts
    // When a User is deleted, also delete any associated Posts
    User.hasMany(models.Post, {
      onDelete: 'cascade'
    });
  };

  return User;
};
