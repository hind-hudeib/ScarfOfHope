import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
export const TableOfDonors = () => {
  const [donors, setDonors] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  // get all donors
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/donors")
      .then((response) => {
        setDonors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `  ${name} هل تريد حذف   `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${name} لقد تم الحذف بنجاح `, "", "success");

        axios
          .put("http://localhost:8000/dashboard/upDonors/" + id)
          .then((response) => {
            console.log(response.data);
          })
          .then(() => {
            forceUpdate();
          })
          .catch((error) => console.log(error.message));
      } else Swal.fire(" تم إلغاء العملية", "", "error");
    });
  };

  const tableRows = donors.map((donor) => {
    return (
      <tr key={donor._id} className="border-b ">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
        >
          {donor.username}
        </th>
        <td className="px-4 py-3">{donor.email}</td>
        <td className="px-4 py-3">{donor.phone}</td>

        <td className="px-4 py-3 flex items-center justify-end">
          <div
            id=""
            className="bg-white  rounded divide-y divide-gray-100 shadow "
          >
            <div className="tooltip tooltip-error text-white" data-tip="حذف">
              <button
                onClick={() => handleDelete(donor._id, donor.username)}
                className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
              >
                <AiOutlineDelete className="text-red-500 text-[15px]" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <section className="w-full  mt-5 ">
      <div className="">
        {/* Start coding here */}
        <h1 className="text-[30px] font-bold py-3">المتبرعون</h1>
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-scroll max-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right text-gray-500 table-zebra ">
              <thead className="text-xs text-white uppercase bg-teal-600 ">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    الاسم
                  </th>
                  <th scope="col" className="px-4 py-3">
                    الإيميل
                  </th>
                  <th scope="col" className="px-4 py-3">
                    رقم الهاتف
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <div className="p-3 text-lg">لا يوجد متبرعون</div>
                ) : (
                  tableRows
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
