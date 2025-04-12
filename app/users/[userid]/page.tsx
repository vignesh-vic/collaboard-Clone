"use client"
interface useridpro{
    params:{
        userid:string
    }
}


const page=({
    params
}:useridpro)=>{
console.log(params.userid,'test');


    return(
        <div>
            user id is {params.userid}
        </div>
    )
}


export default page