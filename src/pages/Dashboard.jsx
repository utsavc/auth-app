import { NavLink, useLoaderData } from "react-router-dom";
import { getHostVans } from "../api/api";
import "../server";
import { requireAuth } from "../utils/utils";


export async function dashboardLoader({request}) {
   const res=await requireAuth(request);
   if(res){
    return await requireAuth(request)
   }
  return getHostVans();
}

export default function Dashboard() {
  const vansData = useLoaderData();
  console.log(vansData);
  const style = {
    textDecoration: "none",
  };

  const dispData = vansData.map((data, index) => (
    <div className="col-4 " key={index}>
      <NavLink style={style}>
        <div className="container ">
          <div className="row">
            <div className="col-lg-12 bg-info p-5 ">
              <h3 className="text-center text-white ">{data.name}</h3>
              <img className="img-thumbnail " src={data.imageUrl} alt="" />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  ));
  return (
    <>
      <h1 className="mt-5 bg-info-subtle ">Dashboard</h1>
      <div className="row">{dispData}</div>
    </>
  );
}
