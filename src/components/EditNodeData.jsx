import React from "react";
import { BsArrowLeft } from "react-icons/bs";


export default function EditNodeData(props) {
    //edit side panel component for editing the text node
    const { message, setMessage, closeEditFn } = props;
    return (
      <>
        <div className="heading-label edit-heading">
          <div>
            {" "}
            <button className="btn close-edit" onClick={closeEditFn}>
            <BsArrowLeft />
            </button>
          </div>
          <div>Message {props.nodeData.id} </div>
        </div>
        <div className="nodes-operations-container">
          <label className="form-label">Text</label>
          <textarea
            name="message_text"
            className="textarea"
            id="message_text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
      </>
    );
  }
  