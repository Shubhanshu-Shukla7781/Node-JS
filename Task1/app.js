

const http=require('http');
const controller=require('./controller');
const {getReqData}=require('./utils');
const thedata=require('./data')

const port=4000;
console.log(thedata);
const server =http.createServer(async (req,res)=>{

    if(req.url==="/data" && req.method==="GET")
    {
        const datas=await new controller().getDatas();
        // console.log(datas);
        res.writeHead(200,{"Content-Type":"application/json"});

        res.end(JSON.stringify(datas));
    }

    // data/:id :GET

    else if(req.url.match(/\/data\/([0-9]+)/)  && req.method==="GET")
    {
        try{
            const id=req.url.split("/")[2];
            const data=await new controller().getData(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(data));

        }
        catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }
    
    //delete a data by using the id 
    else if(req.url.match=(/\/data\/([0-9]+)/) && req.method==="DELETE")
    {
        try{
            const id =req.url.split("/")[2];
            let message=await new controller().deleteData(id);
            res.writeHead(200);
            res.end(JSON.stringify({message}));
        }
        catch{
            res.writeHead(404);
            res.end(JSON.stringify({message:error}));
        }
    }

    //updating the data using the id

    else if(req.url.match(/\/data\/([0-9]+)/) &&  req.method==="PATCH")
    {
        try{
            const id =req.url.split("/")[3];
            let updated_data=await new controller().updateData(id);
            res.writeHead(200);
            res.end(JSON.stringify(updated_data))

        }
        catch{
            res.writeHead(404);
            res.end(JSON.stringify({message:error}));

        }
    }

    //adding some data 

    else if(req.url==="/data" && req.method==="POST")
    {
        let post_data=await getReqData(req);
        let pdata=await new controller().createData(JSON.parse(post_data))
        res.writeHead(200);
        res.end(JSON.stringify(pdata));
    }
    else {
        res.writeHead(404);
        res.end("error Data not found");
    }
});

server.listen(port, () => {
    console.log(`server started on port: ${port}`);
});