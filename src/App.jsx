import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getConnectedEdges
} from "reactflow";
import MessageNode from "./components/MessageNode";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "messageNode",
    position: { x: 0, y: 0 },
    data: { label: "label 1" },
  },
  {
    id: "2",
    type: "messageNode",
    position: { x: 0, y: 100 },
    data: { label: "label 2" },
  },
];
const nodeTypes = { messageNode: MessageNode };
const initialEdges = [{ id: 'e1-2', source: '2', target: '1' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editNode, setEditNode] = useState({ nodeData: {}, status: false });
  const [message, setMessage] = useState("");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewNode = (params) => {
    //adds new node
    setNodes((nds) => nds.concat(params));
  };
  const handleSave = () => {
    const connectedEdges = getConnectedEdges(nodes, edges);
    const nodesLength = nodes.length;
    if((nodesLength - 1) === connectedEdges.length) {
      alert("all nodes connected");
      
    } else {
      alert("please connect all nodes");
    }
    console.log(connectedEdges);
  }
  const handleOnDrop = (e) => {

    console.log(e);
    const uniqueId = Math.random().toString(36).substring(2, 9);
    addNewNode({
      id: uniqueId,
      type: "messageNode",
      position: { x: e.clientX, y: e.clientY },
      data: { label: "new message" },
    });
    console.log(nodes);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnd = (e) => {
    console.log(e);
  };

  //clicking of node
  const handleNodeClick = useCallback((e, node) => {
    console.log(e, node);
    setEditNode({ nodeData: node, status: true });
    setMessage(node.data.label);
  });
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === editNode.nodeData.id) {
          node.data = {
            ...node.data,
            label: message,
          };
        }

        return node;
      })
    );
  }, [message, setNodes]);
  return (
    <>
      <div className="header border">
        <button className="btn" onClick={handleSave}> Save Changes </button>
      </div>
      <div className="flow-container border">
        <div className="flow-layout border">
          <div
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
            style={{ width: "100%", height: "100%" }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onNodeClick={handleNodeClick}
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
        <div className="side-panel border">
          {editNode.status === false && (
            <>
              <div className="heading-label"> Nodes Panel </div>
              <div className="nodes-list-container">
                <button
                  className="btn"
                  draggable={true}
                  onDragOver={handleDragOver}
                >
                  Message
                </button>
              </div>
            </>
          )}
          {editNode.status === true && (
            <EditNodeData
              nodeData={editNode.nodeData}
              message={message}
              setMessage={setMessage}
              closeEditFn={()=>{
                setEditNode({nodeData:{},status:false});
                setMessage("");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

function EditNodeData(props) {
  const { message, setMessage,closeEditFn } = props;
  return (
    <>
      <div className="heading-label edit-heading"> 
      <div> <button className="btn close-edit" onClick={closeEditFn}> {"<"} </button></div>
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
