import { Grid } from "@material-ui/core";
import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import TableComponent from "./tableComponent";

function HomePage() {
  const [nodes, setNodes] = useState([]);
  const [components, setComponents] = useState([]);
  const [edges, setEdges] = useState([]);
  const prevComponentRef = useRef(null);
  const addComponent = (component) => {
    const newComponent = { ...component, id: `c-${components.length + 1}` };
    const positionX = (nodes.length % 5) * 200;
    const positionY = (nodes.length / 5) * 400;
    setComponents([...components, newComponent]);
    const newNode = {
      id: newComponent.id,
      data: { label: newComponent.name },
      position: { x: positionX, y: positionY },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    if (prevComponentRef.current) {
      const newEdge = {
        id: `${prevComponentRef.current.id}-${newComponent.id}`,
        source: prevComponentRef.current.id,
        target: newComponent.id,
      };
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }
    prevComponentRef.current = newNode;
  };

  var items = components?.map((data) => data.name);

  return (
    <>
      <Grid container sx={{ display: "flex", overflowY: "auto" }}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={2} sx={{ zIndex: 2 }}>
          <Sidebar addComponent={addComponent} items={items} />
        </Grid>
        <Grid item xs={10}>
          <div style={{ height: "100vh" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onConnect={(params) => setEdges([...edges, params])}
              snapToGrid={true}
              snapGrid={[15, 15]}
              draggable={true}
              connectable={true}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TableComponent components={components} />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
