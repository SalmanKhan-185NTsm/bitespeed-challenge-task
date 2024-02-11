import React from "react";
import { Handle, Position } from "reactflow";
import { BsMessenger } from "react-icons/bs";

function MessageNode({ data, isConnectable }) {
  //custom node for text data 
  return (
    <div className="text-updater-node">
      <div className="top-bar">
        <label htmlFor="text"><BsMessenger /> Send Message</label>
      </div>
      <div className="message-text">{data.label}</div>
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default MessageNode;
