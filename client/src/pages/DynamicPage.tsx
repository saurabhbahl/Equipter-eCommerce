import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { BackendUrl } from "../utils/url";

const DynamicPage = () => {
  const [dataState, setDataState] = useState({
    data: [],
    loading: true,
  });
  useEffect(() => {
    const query = {
      query: "SELECT Id, Name, Product_Price__c FROM Product__c",
    };
    (async () => {
      const response = await fetch(`${BackendUrl}/api/v1/sf/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        console.error("Error fetching data:", response);
        return;
      }

      const resData = await response.json();
      console.log("Res", resData);
      setDataState({ loading: false, data: resData.data });
    })();
  }, []);

  return (
    <>
      {" "}
      {dataState.loading ? (
        <Loader span="Loading Data" />
      ) : (
        <table className="max-w-lg mx-auto shadow-md my-10 bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Product</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dataState?.data?.records?.map((rec) => {
              return (
                <tr className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-3 px-6">{rec.Id}</td>
                  <td className="py-3 px-6">{rec.Name}</td>
                  <td className="py-3 px-6">${rec.Product_Price__c}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DynamicPage;
