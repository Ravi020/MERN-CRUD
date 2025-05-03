import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowUser() {
  let [user, setUsers] = useState([]);

  useEffect(() => {
    DataAya();
  }, []);

  async function DataAya() {
    try {
      await axios.get("http://localhost:3001/gym/getuser").then((a) => {
        console.log(a.data);
        setUsers(a.data);
      });
    } catch (error) {
      toast.error("Error loading users: " + error.message);
      console.log(error);
    }
  }

  async function delete_recond(id) {
    if (window.confirm("Are You Sure you want to delete this Record?")) {
      try {
        await axios.delete(`http://localhost:3001/gym/getuser/${id}`);
        toast.success("User deleted successfully!");
        DataAya(); // Refresh the list
      } catch (error) {
        toast.error("Error deleting user: " + error.message);
        console.log(error);
      }
    }
  }

  return (
    <div className="container">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="text-center my-4">
        <h2>User Records</h2>
      </div>
      <div className="row">
        {user.length === 0 ? (
          <p className="text-center">No Record Found</p>
        ) : (
          user.map((a) => (
            <div className="mt-3 col-md-4" key={a._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Name :{a.name}</h5>
                  <p className="card-text">Email: {a.email}</p>
                  <button 
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => delete_recond(a._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}