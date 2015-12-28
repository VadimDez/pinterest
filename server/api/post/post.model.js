'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Post', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    }
  });
}
