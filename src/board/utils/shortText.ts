export const shortText = (originalText: string, limit: number) => {
    if(originalText?.length > limit){
        return originalText.slice(0, limit) + '...';
    }
    return originalText;
}