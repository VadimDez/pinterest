'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Like', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    }
  });
}
