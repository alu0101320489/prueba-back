import { Document } from 'mongoose';
interface Usuario extends Document {
    nombre: string;
    contraseña: string;
    equipo: string[];
}
export declare const Usuario: import("mongoose").Model<Usuario, {}, {}>;
export {};
