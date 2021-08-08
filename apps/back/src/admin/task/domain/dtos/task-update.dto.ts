import { VOTitle } from '../value-objects/title.vo';
import { VODescription } from '../value-objects/description.vo';



export interface TaskUpdateDto {
    /** Task's title */
    title?: VOTitle;
    /** Task's description */
    description?: VODescription;

}