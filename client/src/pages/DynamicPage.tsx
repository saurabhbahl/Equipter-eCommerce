"use server";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { BackendUrl } from "../utils/url";
import InputField from "../components/InputFeild";
interface ProductRecord {
  Id: string;
  Name: string;
  Product_Price__c: string;
}
interface DataState {
  data: {
    records: ProductRecord[];
  };
  loading: boolean;
}
const DynamicPage = () => {
  const [dataState, setDataState] = useState<DataState>({
    data: { records: [] },
    loading: true,
  });

  const [inputData, setInputData] = useState({
    name: "",
    Product_Price__c: "",
  });

  const [newRes, setNewRes] = useState<{
    feedbackMessage: string | null;
    loading: boolean;
  }>({ feedbackMessage: null, loading: false });

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
  }, [newRes.loading == true]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  }

  async function handleAddNew() {
    if (!inputData.name || !inputData.Product_Price__c) {
      setNewRes({
        feedbackMessage: "Please fill in all fields.",
        loading: false,
      });
      setTimeout(() => {
        setNewRes({
          feedbackMessage: null,
          loading: false,
        });
      }, 2000);
      return;
    }

    setNewRes({
      feedbackMessage: null,
      loading: true,
    });
    const data = { objectName: "Product__c", ...inputData };
    try {
      const raw = await fetch(`${BackendUrl}/api/v1/sf/object/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await raw.json();
      if (res.success) {
        setNewRes({
          feedbackMessage: "Product Added Successfully",
          loading: false,
        });
        setInputData({ name: "", Product_Price__c: "" });
        setTimeout(() => {
          setNewRes({
            feedbackMessage: null,
            loading: false,
          });
        }, 2000);
      } else {
        setNewRes({
          feedbackMessage: "Failed to add product.",
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setNewRes({
        feedbackMessage: "An error occurred. Please try again.",
        loading: false,
      });
    }
  }

  return (
    <>
      {dataState.loading ? (
        <Loader span="Loading Data" />
      ) : (
        <div className="flex flex-col justify-center items-center p-6">
          <h1 className="text-2xl font-bold mb-4">Product List</h1>
          {newRes.feedbackMessage && (
            <div className="mb-4 text-green-600 transition-all ease-in duration-1000">
              {newRes.feedbackMessage}
            </div>
          )}
          <div className="flex justify-center gap-3 items-center my-auto">
            <InputField
              id="productName"
              type="text"
              value={inputData.name}
              onChange={handleChange}
              name="name"
              placeholder="Enter new product name"
           
            />
            <InputField
              id="productPrice"
              type="number"
              value={inputData.Product_Price__c}
              onChange={handleChange}
              name="Product_Price__c"
              placeholder="Enter new product Price"
            />
            <button
              onClick={handleAddNew}
              className="border border-orange-300 bg-custom-orange text-white rounded-md p-1 mt-[4px] transition-transform transform hover:scale-105"
            >
              {newRes.loading ? <Loader /> : "Add New"}
            </button>
          </div>
          <table className="max-w-3xl mx-auto shadow-md my-10 bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Sr No.</th>
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Product Price</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {dataState?.data?.records?.map(
                ({
                  Id,
                  Name,
                  Product_Price__c,
                }: {
                  Id: string;
                  Name: string;
                  Product_Price__c: string;
                },idx:number) => (
                  <tr
                    key={Id}
                    className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <td className="py-3 px-6">{idx+1}</td>
                    <td className="py-3 px-6">{Id}</td>
                    <td className="py-3 px-6">{Name}</td>
                    <td className="py-3 px-6">${Product_Price__c}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DynamicPage;
