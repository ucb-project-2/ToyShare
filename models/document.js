module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define("Document", {
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    file_type: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },

  });

  // Document will be associated to post that they are contained within,
  // therefore, also associated with the user that created the post.
  Document.associate = (models) => {
    Document.belongsTo(models.Post, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Document;
};
