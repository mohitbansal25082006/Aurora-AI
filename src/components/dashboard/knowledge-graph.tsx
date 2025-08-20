'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Entity {
  name: string;
  type: string;
  relevance: number;
  connections: number;
}

interface KnowledgeGraphProps {
  entities: Entity[];
}

interface Node extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  type: string;
  relevance: number;
  connections: number;
  radius: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: number | Node;
  target: number | Node;
  value: number;
}

export function KnowledgeGraph({ entities }: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!svgRef.current || entities.length === 0) return;

    // Only run once or when entities change significantly
    if (isInitialized && entities.length > 0) {
      return;
    }

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create group for the graph
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create nodes
    const nodes: Node[] = entities.map((d, i) => ({
      id: i,
      name: d.name,
      type: d.type,
      relevance: d.relevance,
      connections: d.connections,
      radius: 10 + d.relevance * 20,
      x: 0,
      y: 0
    }));

    // Create links (random connections for demo)
    const links: Link[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.7) {
          links.push({
            source: i,
            target: j,
            value: Math.random()
          });
        }
      }
    }

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => (d as Node).id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2 - margin.left - margin.right, height / 2 - margin.top - margin.bottom))
      .force("collision", d3.forceCollide<Node>().radius((d) => d.radius + 5));

    // Create links
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#4a5568")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value) * 2);

    // Create nodes
    const node = g.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => {
        const colors: Record<string, string> = {
          'Technology': '#3182ce',
          'Company': '#38a169',
          'Person': '#d69e2e',
          'Location': '#e53e3e',
          'Concept': '#805ad5',
          'Field': '#dd6b20',
          'Process': '#319795',
          'Product': '#b83280'
        };
        return colors[d.type] || '#718096';
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .call(d3.drag<SVGCircleElement, Node>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add labels
    const label = g.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text((d) => d.name)
      .attr("font-size", "12px")
      .attr("dx", 15)
      .attr("dy", 4)
      .attr("fill", "#e2e8f0");

    // Add tooltips
    node.append("title")
      .text((d) => `${d.name} (${d.type})\nRelevance: ${(d.relevance * 100).toFixed(0)}%\nConnections: ${d.connections}`);

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      node
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!);

      label
        .attr("x", (d) => d.x!)
        .attr("y", (d) => d.y!);
    });

    // Mark as initialized
    setIsInitialized(true);

    // Clean up function
    return () => {
      simulation.stop();
    };
  }, [entities, isInitialized]); // Only re-run when entities change or on first render

  // Handle window resize separately
  useEffect(() => {
    if (!svgRef.current || entities.length === 0) return;
    
    const handleResize = () => {
      if (!svgRef.current) return;
      const width = svgRef.current.clientWidth;
      d3.select(svgRef.current).attr("width", width);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [entities]);

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
      <h3 className="text-lg font-semibold mb-4">Knowledge Graph</h3>
      <div className="overflow-x-auto">
        <svg ref={svgRef} className="w-full h-[500px]"></svg>
      </div>
    </div>
  );
}