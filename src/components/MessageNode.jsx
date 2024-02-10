import React from "react"; 
import { Handle, Position } from 'reactflow';

function MessageNode({ data, isConnectable }) {
  return (
    <div className="text-updater-node">
      <div className="top-bar">
        <label htmlFor="text">Send message:</label>
      </div>
      <div className="message-text">
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle type="target" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default MessageNode;