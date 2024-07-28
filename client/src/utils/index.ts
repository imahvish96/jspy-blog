import slugify from "slugify";
import { dateOptionsConfig } from "../config";

export const formateDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", dateOptionsConfig);
}


export const generateSlug = ({ title }: { title: string}) => {
    return slugify(title, {
        replacement: '-',  
        remove: undefined, 
        lower: true,      
        strict: false,     
        trim: true
      }) 
}