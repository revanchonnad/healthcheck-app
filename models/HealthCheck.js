const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HealthCheck = sequelize.define('HealthCheck', {
    checkId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'check_id'
    },
    checkDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'check_datetime'
    }
  }, {
    tableName: 'health_checks',
    timestamps: false
  });

  return HealthCheck;
};