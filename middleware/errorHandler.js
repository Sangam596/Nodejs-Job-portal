export const errorHandler = async (err, req, res, next)=>{
    const defaultErrors = {Success:false,Message : err}
    //missing failed error 
    if(err.name=== 'validationError'){
        defaultErrors.statusCode = 400;
        defaultErrors.message = Object.values(err.errors).map(item=>item.message).join(', ');
    }
    if(err.code && err.code=== 11000){
        defaultErrors.statusCode = 400;
        defaultErrors.message = `${Object.keys(err.keyValue)} Field Has to be unique.`;
    }    
    res.status(defaultErrors?.statusCode || 500).json(defaultErrors);;


}