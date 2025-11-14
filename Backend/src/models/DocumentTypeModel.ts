import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../database/config.database.ts'

interface DocumentType {
    id_type?: number,
    name: string,
    abbreviation: string,
    create_at?: Date
}

export const DocumentTypeModel = sequelize.define("document_type", {
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