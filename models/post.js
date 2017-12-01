module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    item_img: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
    item_desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    borrowed: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
    // price: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   len: [1]
    // }
  });

  Post.associate = (models) => {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });

    Post.hasMany(models.Document, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Post;
};
