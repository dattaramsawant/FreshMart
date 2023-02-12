module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users',{
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      roleId: {
        type: DataTypes.INTEGER
      },
      forgetId: {
        type: DataTypes.STRING
      },
      isDeleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },{
      tablName: 'users',
      timestamps: true
    })

    User.addScope('activeUser',{
        where:{
            isDeleted: 0
        }
    })

    User.addScope('inActiveUser',{
        where:{
            isDeleted: 1
        }
    })

    User.associate=(models)=>{
        User.belongsTo(models.roles,{ foreignKey: 'roleId', as: "role" })
    }
  
    return User
  };