import { Document } from 'mongoose';

//TODO: Crear Genre enum y SocialAccount type
export interface ITask {

    _id: string;

    /** Todo's title */
    title: string;

    /** Todo's description */
    description: string;

    /** Todo's state */
    is_finish: boolean;
}

export interface ITaskDoc extends ITask, Omit<Document, '_id'> {}