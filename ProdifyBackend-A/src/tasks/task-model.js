import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    título: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    descripción: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    prioridad: {
        type: String,
        enum: ['Baja', 'Media', 'Alta'],
        default: 'Media'
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'En Progreso', 'Completada'],
        default: 'Pendiente'
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha límite es obligatoria']
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Task', TaskSchema);
