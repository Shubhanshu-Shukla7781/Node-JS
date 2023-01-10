function getReqData(req){
    return new Promise((resolve,reject)=>{

        try{
            let body="";
            
            //listening the data sent by client

            req.on("data",(chunk)=>{
                //append the string version to the body

                body+=chunk.toString();

            });
            req.on("end",()=>{
                // sending back the data

                resolve(body);
            });
        }
        catch(error)
        {
            reject(error);
        }
    });
}

module.exports={getReqData};