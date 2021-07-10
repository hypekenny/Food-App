


export const dietsArray = obj => {
    let arrayaux = [];
    arrayaux = obj.diets.map(e => e.name);
    return {...obj, diets: arrayaux}
}

export const dietModifier = arr => {    
    return arr.map (e => {
        if(typeof e.diets[0] === 'object') {
          e = dietsArray(e) }
            return e 
        })
}