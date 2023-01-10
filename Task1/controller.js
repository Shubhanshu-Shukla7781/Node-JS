const data =require("./data");


class Controller
{
    
    //getting all the data
    async getDatas()
    {

        return new Promise((resolve,_)=>resolve(data));
    
    }

    //getting specific data using id

    async getData(id){

        return new Promise((resolve,reject)=>{
            //get the data

            let specific_data=data.find((specific_data)=>specific_data.id===parseInt(id));
            if(specific_data)
            {
                resolve(specific_data);
            }

            else {
                reject(`Data with id ${id} not found`);
            }
        });
    }

    //creating a new data 

    async createData(mydata){
        return new Promise((resolve,_)=>{
            let newData={
                id: Math.floor(4+Math.random()*10),
                ...mydata,
            }
            resolve(newData);
        });
    }

    //updating the data using an id 

    async updateData(id)
    {
        return new Promise((resolve,reject)=>{

            // get the data

            let myData=data.find((myData)=>myData.id===parseInt(id));

            if(!myData)
            {
                reject(`No Data with id ${id} is present`);
            }

            myData["completed"]=true;

            resolve(myData);
        });
    }

    //deleting a data using an id 

    async deleteData(id)
    {
        return new Promise((resolve,reject)=>{

            //get the data
            let myData=data.find((myData)=>myData.id===parseInt(id));

            //If no data with that id , return error

            if(!myData)
            {
                reject(`No data with id ${id} is found `);
            }

            resolve(`   Data with id ${id} is deleted successfully`)

        })
    }

}


module.exports=Controller;