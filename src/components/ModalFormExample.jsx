import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ModalAddPartyRow({ party, setParty }) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState(
    {
        pcName: "",
        pcRace: "",
        pcClass: "",
        pcLevel: "",
        pcImg: "",
        pcBackstory: "",
        pcGoals: "",
        pcExtras: ""
    });

  const handleChange = (e) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    };

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.pcName && formState.pcRace && formState.pcClass && formState.pcLevel) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };
    
  const handleSubmit = () => {

    if (!validateForm()) return;

    axios.post('/api/party', 
      { pcId: formState.pcId, pcImg: formState.pcImg, pcName: formState.pcName, pcRace: formState.pcRace, pcClass: formState.pcClass, pcLevel: formState.pcLevel, pcBackstory: formState.pcBackstory, pcGoals: formState.pcGoals, pcExtras: formState.pcExtras }).then((res) => {
        
        
        setParty([res.data, ...party])

        handleClose()
      })
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add New Party Member
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Party Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Character Name:</Form.Label>
              <Form.Control 
                as="input" 
                placeholder="Enter Name"
                name="pcName" 
                onChange={handleChange} 
                value={formState.pcName}
                autoFocus 
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Race/Species:</Form.Label>
              <Form.Control
                as="input"  
                placeholder="Enter Race"
                name="pcRace" 
                onChange={handleChange} 
                value={formState.pcRace}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Class/Subclass:</Form.Label>
              <Form.Control 
                as="input" 
                placeholder="Enter Class - Subclass" 
                name="pcClass" 
                onChange={handleChange} 
                value={formState.pcClass} 
                />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Level:</Form.Label>
              <Form.Control 
                as="input" 
                placeholder="#" 
                name="pcLevel" 
                onChange={handleChange} 
                value={formState.pcLevel} 
                />
            </Form.Group>

            {/* <Form.Group className="mb-3" >
              <Form.Label>Image:</Form.Label>
              <Form.Control 
                as="input" 
                placeholder="(Optional) Add link to photo" 
                name="pcImage" 
                onChange={handleChange} 
                value={formState.pcImg} 
                />
            </Form.Group> */}

          </Form>
        </Modal.Body>
        <Modal.Footer>
        {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" type='submit' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
