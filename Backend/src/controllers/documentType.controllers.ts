import { Request, Response } from "express";
import { DocumentTypeModel } from "../models/DocumentTypeModel.ts";

export const getDocumentTypes = async (_req: Request, res: Response) => {
    try {
        const documentTypes = await DocumentTypeModel.findAll();
        res.json(documentTypes);
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener tipos de documento", error: error.message });
    }
}
