import React, { useCallback, useEffect, useState } from "react";
import { BsMessenger } from "react-icons/bs";

import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getConnectedEdges,
} from "reactflow";
import MessageNode from "./components/MessageNode";
import EditNodeData from "./components/EditNodeData";
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
    position: { x: 300, y: 100 },
    data: { label: "label 2" },
  },
];
const nodeTypes = { messageNode: MessageNode };
const initialEdges = [{ id: "e1-2", source: "2", target: "1" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editNode, setEditNode] = useState({ nodeData: {}, status: false });
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewNode = (params) => {
    //adds new node
    setNodes((nds) => nds.concat(params));
  };
  const handleReset = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };
  const handleSave = () => {
    const connectedEdges = getConnectedEdges(nodes, edges);
    const nodesLength = nodes.length;
    if (nodesLength - 1 === connectedEdges.length) {
      setAlert("");
    } else {
      setAlert("Cannot Save Flow");
    }
    // console.log(connectedEdges);
  };
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
  //clicking of node
  const handleNodeClick = useCallback((e, node) => {
    console.log(e, node);
    setEditNode({ nodeData: node, status: true });
    setMessage(node.data.label);
  });
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setAlert("")
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [alert]);
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
      {alert !== "" && <div className="validation-alert">{alert}</div>}

      <div className="header border">
        <button className="btn" onClick={handleSave}>
          {" "}
          Save Changes{" "}
        </button>
        <button className="btn" onClick={handleReset}>
          {" "}
          Reset{" "}
        </button>
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
              <div className="nodes-list-container">
                <button
                  className="btn center-align"
                  draggable={true}
                  onDragOver={handleDragOver}
                >
                  <div><BsMessenger /> Message </div>
                  
                </button>
              </div>
            </>
          )}
          {editNode.status === true && (
            <EditNodeData
              nodeData={editNode.nodeData}
              message={message}
              setMessage={setMessage}
              closeEditFn={() => {
                setEditNode({ nodeData: {}, status: false });
                setMessage("");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

