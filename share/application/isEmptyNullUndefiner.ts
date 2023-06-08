export const isEmptyNullOrUndefined = (...values: any[]): boolean =>{
    for(const value of values){
        if(value === undefined || value === null || value === '') return true;
    }
    return false
}
    