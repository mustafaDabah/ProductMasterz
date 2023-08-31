import slugify from 'slugify';

export function generateSlug(title) {
    const options = {
        replacement: '-',  
        lower: true,       
        strict: true       
    };
    
    return slugify(title, options);
}
