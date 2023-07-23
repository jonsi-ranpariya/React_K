import React, { useContext, useEffect } from "react";
import SideBar from "../components/Sidebar/SideBar";
// import { Link } from 'react-router-dom'
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header";
import axios from "axios";
import { UserContext } from "../components/context/UserContext";
import DataTable from "react-data-table-component";
import UserEditPopup from "../components/editUser/UserEditPopup";

const Users = () => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [selectedOption, setSelectedOption] = useState('');
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState();

  const selectIdarr = country && country.filter(el => el.name === selectedOption)
  const selectID = selectIdarr && selectIdarr.map(el => el.id)

  const [states, setStates] = useState([]);

  const token = sessionStorage.getItem("token");
  const usercontext = useContext(UserContext);
  const userdata = usercontext && usercontext?.data;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  const handleEditSubmit = (user) => {
    updateUsersApi(user);
    setIsEditPopupOpen(false);
  };

  //here we have an AGE validation function
    const [birthdate, setBirthdate] = useState("");
    const [error, setError] = useState("");
  
    function handleSubmit(event) {
      event.preventDefault();
      const today = new Date();
      const selectedDate = new Date(birthdate);
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }
      if (age < 18) {
        setError("You must be at least 18 years old to access this site.");
      } else {
        // allow access to the site
      }
    }
  
 

  const updateUsersApi = async () => {
    await axios
      .post("https://interview-api.kodecreators.com/api/users/update", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        usercontext.setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsersApi = async () => {
    await axios
      .get("https://interview-api.kodecreators.com/api/users/detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        usercontext.setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCountry = async () => {
    await axios
      .get(
        "https://interview-api.kodecreators.com/api/countries?page=1&per_page=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCountry(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // const getStates = async (selectID) => {
  //   await axios
  //     .get(
  //       `https://interview-api.kodecreators.com/api/states?page=1&per_page=10&country_id=${selectID}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setStates(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getStatesApi = (selectID) => {
    axios
      .get(
        `https://interview-api.kodecreators.com/api/states?page=1&per_page=10&country_id=${selectID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStates(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if(selectID){
      getStatesApi(selectID);
    }
  }, [selectedOption])

  useEffect(() => {
    getUsersApi();
    getCountry();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      style: {},
    },
    {
      name: "NAME",
      selector: (row) => row.name,

      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => row.date_of_birth,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Hobbies",
      selector: (row) => row.hobbies,
      sortable: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <div className="">
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => {
              // handleDelete(row.id);
            }}
          >
            Delete
          </button>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <div className="">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => handleEditClick(row)}
          >
            Edit
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div className="container-fluid" style={{ marginTop: "5rem" }}>
          <div className="card">
            <div className="card-title">
              <h2 className="align-item-center">Users</h2>
            </div>
            <div className="card-body">
              <div className="divbtn">
                <Button variant="primary" className="mb-3" onClick={handleShow}>
                  Add User
                </Button>
              </div>

              <DataTable columns={columns} data={[userdata]} />

              {/* <!--- Model Box ---> */}
              <div className="model_box">
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="input"
                          className="form-control"
                          placeholder="Enter Name"
                        />
                      </div>
                      &nbsp;
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      &nbsp;
                      <div>
                        <input
                          type="radio"
                          value="Male"
                          name="gender"
                          className="m-2"
                        />{" "}
                        Male &nbsp;
                        <input type="radio" value="Female" name="gender" />{" "}
                        Female
                      </div>
                      <div class="form-group mt-3">
                        <input
                          type="date"
                          class="form-control"
                          id="date"
                          onChange={(event) => setBirthdate(event.target.value)}
                          className="form-control"
                          placeholder="Date Of Birth"
                        />
                      </div>
                      &nbsp;
                      <select className="form-control" value={selectedOption} name="country" onChange={handleSelectChange}>
                        <option value='select'>Select Country</option>
                        {country &&
                          country.map((el) => <option value={el.name}>{el.name}</option>)}
                      </select>{" "}
                      &nbsp;
                      <select className="form-control" name="country">
                        <option value='select'>Select State</option>
                        {states &&
                          states.map((el) => <option value={el.name}>{el.name}</option>)}
                      </select>{" "}
                      &nbsp;
                      <div>
                        <label>Hobbies</label>
                      </div>
                      <div>
                        <label className="m-2">
                          <input type="checkbox" />
                          &nbsp;cooking
                        </label>
                        <label className="m-2">
                          <input type="checkbox" />
                          &nbsp;Singing
                        </label>
                        <label className="m-2">
                          <input type="checkbox" />
                          &nbsp;Swimming
                        </label>
                        <label className="m-2">
                          <input type="checkbox" />
                          &nbsp;Dansing
                        </label>
                      </div>
                      {/* <div>
               
                </div> */}
                      {/* <button type="submit" class="btn btn-success mt-4">
                        Add User
                      </button> */}
                    </form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="primary">
                      Add User
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Model Box Finsihs */}
              </div>

              {/* edituser Modal */}
              {isEditPopupOpen && (
                <UserEditPopup
                  user={selectedUser}
                  onSubmit={handleEditSubmit}
                  onCancel={() => setIsEditPopupOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
