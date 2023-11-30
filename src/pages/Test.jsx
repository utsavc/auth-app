import { requireAuth } from "../utils/utils";

export async function testLoader(request){
    return await requireAuth(request);    
}

export default function Test(){
    return(
        <>

        Test
        
        </>
    )
}