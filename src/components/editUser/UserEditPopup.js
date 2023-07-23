import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function UserEditPopup({ user, onSubmit, onCancel }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.date_of_birth);

  console.log("user-emal", name, email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email };
    console.log("updateuser", updatedUser);
    onSubmit(updatedUser);
  };

  return (
    <>
      <div className="model_box">
        <Modal show={true} onHide={onCancel} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="input"
                  value={name}
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
                  value={email}
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              &nbsp;
              <div>
                <input
                  type="radio"
                  value={gender}
                  name="gender"
                  className="m-2"
                />{" "}
                Male &nbsp;
                <input type="radio" value={gender} name="gender" /> Female
              </div>
              <div class="form-group mt-3">
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  value={dob}
                  className="form-control"
                  placeholder="Date Of Birth"
                />
              </div>
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
              {/* <div
               
                </div> */}
            </form>
          </Modal.Body>

          <Modal.Footer>
            <button type="submit" class="btn btn-success mt-1">
              Edit User
            </button>
            <Button variant="secondary" onClick={onCancel}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
