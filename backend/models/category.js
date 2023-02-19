module.exports = (sequelize,DataTypes) => {
    const Category = sequelize.define('categories',{
        name:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.TEXT
        },
        image:{
            type: DataTypes.STRING
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        tableName:'categories',
        timestamps: true
    })


    Category.addScope('activeCategory',{
        where:{
            isDeleted: 0
        }
    })

    Category.addScope('inActiveCategory',{
        where:{
            isDeleted: 1
        }
    })

    return Category
}