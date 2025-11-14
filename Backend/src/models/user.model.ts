import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/config.database.ts'
import { DocumentTypeModel } from './DocumentTypeModel.ts'
import bcrypt from 'bcrypt'

interface IUser {
    id?: number
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    birth_date?: Date,
    document_number?: string
    document_types_id?: number,
    phone: string,
    address?: string,
    create_at?: Date
}

export const UserModel = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date:{
        type: DataTypes.DATE,
        allowNull: true
    },
    document_number:{
        type: DataTypes.STRING,
        allowNull: true
    },
    document_types_id :{
        type:DataTypes.INTEGER,
        references:{
            model:"document_types",
            key:"id_type"
        },
        allowNull: true,
        defaultValue: null
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type:DataTypes.STRING,
        allowNull: true
    },
    create_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }

},
    {
        tableName: "Users",
        timestamps: false
    })

UserModel.belongsTo(DocumentTypeModel, {
    foreignKey:"document_types_id",
    as: "document_types"
});

DocumentTypeModel.hasMany(UserModel,{
    foreignKey:"document_types_id",
    as:"users"
})

// No hashing for simplicity
