"use client"
// interface useridpro{
//     params:{
//         userid:string
//     }
// }


const page=({
    params
}:any)=>{
console.log(params.userid,'test');


    return(
        <div>
            user id is {params.userid}
        </div>
    )
}


export default page