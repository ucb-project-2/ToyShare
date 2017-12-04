module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    poster_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    item_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    item_description: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    borrowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    recipient: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    },
    poster_email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    recipient_email: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    }
  });

  Post.associate = (models) => {
  //   // We're saying that a Post should belong to an User
  //   // A Post can't be created without an User due to the foreign key constraint
  //   Post.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: true
  //     }
  //   });

    Post.hasMany(models.Document, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Post;
};
