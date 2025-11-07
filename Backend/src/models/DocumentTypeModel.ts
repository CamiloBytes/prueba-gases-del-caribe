import { DataTypes, ModelDefined } from 'sequelize'

import { DocumentType } from '../interface/IUser'
import { sequelize } from '../database/config.database'

export const DocumentTypeModel:ModelDefined<DocumentType, Omit<DocumentType, "id">> = sequelize.define("document_type", {
    id_type: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})