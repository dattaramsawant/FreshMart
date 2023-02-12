module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define('products',{
        productId:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
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

    return Product
}