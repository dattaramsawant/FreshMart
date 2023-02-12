module.exports = (sequelize,DataTypes) => {
    const Role = sequelize.define('roles',{
        roleName:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId:{
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'roles',
        timestamps: true
    })

    Role.associate = (models) =>{
        Role.hasMany(models.users,{foreignKey: 'roleId', as: 'user'})
    }

    return Role;
}