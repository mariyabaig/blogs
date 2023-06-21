import React from "react";

const Blogs = () => {
  return (
    <>
      <div className="bg-blue-200 min-h-screen py-32 px-10">
        <div className="bg-white p-10 rounded-lg shadow m:w-3/4 lg:w-1/2 mx-auto">
          <form action="">
            <div className="mb-5">
              <lable for="title" className="block mb-2 text-gray-500 font-bold">
                Title
              </lable>
              <input
                type="text"
                id="title"
                placeholder="what did i do today?"
                className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
              />
            </div>

            <div className="mb-10">
              <lable
                for="category"
                className="block mb-2 text-gray-500 font-bold"
              >
                Category
              </lable>
              <input
                type="text"
                id="category"
                placeholder="Journal"
                className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
              />

              {/* <p className="text-red-400 text-sm mt-2">
                Twitter username is required
              </p> */}
            </div>
            <div className="mb-10">
              <lable
                for="content"
                className="block mb-2 text-gray-500 font-bold"
              >
                Content
              </lable>
              <input
                type="text"
                id="content"

                className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
              />

              {/* <p className="text-red-400 text-sm mt-2">
                Twitter username is required
              </p> */}
            </div>
            <button className="block w-full bg-blue-400 p-4 text-white font-bold rounded-lg shadow hover:shadow-lg">
              Submit
            </button>
          </form>
        </div>
      </div>

      <hr />

      
    </>
  );
};

export default Blogs;
