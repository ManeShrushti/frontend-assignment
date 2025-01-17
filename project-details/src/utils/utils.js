export const replaceDotWithUnderscore = (data) => {
    data.map((obj,index)=> {
        const newObj = {};
        for(let key in obj){
            if (obj.hasOwnProperty(key)) {
                const newKey = key.replace(".", '_');
                newObj[newKey] = obj[key];
            }
        }
        data[index] = newObj;
    });
    return data;
};