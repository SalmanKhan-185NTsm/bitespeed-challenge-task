import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import MessageNode from "./components/MessageNode";
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', type: "messageNode", position: { x: 0, y: 0 }, data: { label: 'label 1' } },
  { id: '2', type: "messageNode", position: { x: 0, y: 100 }, data: { label: 'label 2' } }
];
const nodeTypes = { messageNode: MessageNode };
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNewNode = (params) => {
    // setNodes((nds) => nds.concat({ id: '3', position: { x: 0, y: 300 }, data: { label: '2' } }));
    setNodes((nds) => nds.concat(params));
  }
  const handleOnDrop = (e) => {
    console.log(e);
    const uniqueId = Math.random().toString(36).substring(2, 9);

    addNewNode({
      id: uniqueId,
      type: "messageNode",
      position: { x: e.clientX, y: e.clientY },
      data: { label: "new message" }
    });
    console.log(nodes);
  }
  const handleDragOver = (e) => {
    e.preventDefault();
  }
  const handleDragEnd = (e) => {
    console.log(e)
  }
  return (<>
    <div className='header border'>
      <button className='btn' > Save Changes </button>
    </div>
    <div className='flow-container border'>
      <div className='flow-layout border'>
        <div onDrop={handleOnDrop}
          onDragOver={handleDragOver}
          style={{ width: '100%', height: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
      <div className='side-panel border'>
        <div className='heading-label'> Nodes Panel </div>
        <div>
          <button className='btn' draggable={true} onDragOver={handleDragOver}>Message</button>
        </div>
      </div>

    </div>
  </>
  );
}