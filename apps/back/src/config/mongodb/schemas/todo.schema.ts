import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


/**
 * Mongoose user's schema definition
 */
@Schema({
    versionKey: false,
    timestamps: true
})
export class Todo {

    @Prop({ type: String, required: true })
    _id: string;

    /** Todo's title */
    @Prop({ type: String, required: true, unique: false, index: true })
    title: string;

    /** Todo's description */
    @Prop({ type: String, required: false })
    description: string;

    /** Todo's state */
    @Prop({ type: Boolean, required: false, default: false })
    is_finish: boolean;

}

/**
 * Mongoose todo's schema object
 */
export const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.index({ title: 1 });