module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('products',{
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
        tableName:'products',
        timestamps: true
    })


    Product.addScope('activeProduct',{
        where:{
            isDeleted: 0
        }
    })

    Product.addScope('inActiveProduct',{
        where:{
            isDeleted: 1
        }
    })

    return Product
}