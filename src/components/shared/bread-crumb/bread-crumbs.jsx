import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    console.log(pathname);
    const { pathnames } = pathname.split("/").filter((item) => item);
    console.log(pathnames)
    return (
      <div>
        <Breadcrumb>
          {pathnames?.length > 0 ? (
            <Breadcrumb.Item>
              <Link to='/'>Home</Link>
            </Breadcrumb.Item>
          ):(
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {pathnames?.map((name,index)=>{
            const routeTo = `/${pathnames.slice(0,index +1).join("/")}`;
            const itLast = index ===pathname.length - 1;
            return itLast?(
              <Breadcrumb.Item>
              {name}
              </Breadcrumb.Item>
            ):(
              <Breadcrumb.Item>
              <Link to={`${routeTo}`}>{name}</Link>
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </div>
    )
  }
  return <>{breadCrumbView()}</>
}

export default BreadCrumb;

// export default function BreadCrumb({ data, setReturnedItemFunc, ...props }) {
//   return (
//     <div>
//       {data?.map((item) => (
//         <a
//           onClick={(e) => {
//             setReturnedItemFunc({
//               mode: item.mode,
//               id: item.id,
//             });
//           }}
//         >
//           {data.length > 1 ? "/" + item.name : ""}
//         </a>
//       ))}
//     </div>
//   );
// }
