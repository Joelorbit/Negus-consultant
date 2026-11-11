import React, { useState, useEffect, useMemo } from "react";
import Tree from "react-d3-tree";
import axiosInstance from "../../../../lib/axiosInstance";

// Simple stat card
function StatCard({ label, value, accent = "blue" }) {
  const accents = {
    blue: "from-blue-50 to-indigo-50 text-blue-700 border-blue-200",
    emerald: "from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200",
    amber: "from-amber-50 to-yellow-50 text-amber-700 border-amber-200",
    slate: "from-slate-50 to-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <div
      className={`flex-1 rounded-xl border bg-gradient-to-br px-4 py-3 shadow-sm ${accents[accent]}`}
    >
      <div className="text-xs font-medium opacity-75">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

export default function ReferralTree() {
  const [tree_data, set_tree_data] = useState(null);
  const [translate, set_translate] = useState({ x: 0, y: 0 });
  const [nigus_profit, set_nigus_profit] = useState(0);
  const [network_profit, set_network_profit] = useState(0);
  const [selected_profit, set_selected_profit] = useState("none");
  const [total_purchases, set_total_purchases] = useState(0);
  const [potentials, set_potentials] = useState(0.0);
  const [, set_course] = useState(null);

  const profitText = useMemo(() => {
    if (selected_profit === "nigus") return `Nigus Profit: $${nigus_profit}`;
    if (selected_profit === "network")
      return `Network Profit: $${network_profit}`;
    return "";
  }, [selected_profit, nigus_profit, network_profit]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const queryId = searchParams.get("id");
    if (!queryId) return;

    async function fetchData() {
      try {
        const res = await axiosInstance.get(
          `/payments/course_purchases/b2427308-b9a9-4b89-8b55-24308243e756`
        );

        const data = res.data;
        const root_id = data.root_id;
        set_course(data.course);
        set_total_purchases(res.data.purchases.length);
        let nigus_profit = 0;
        let network_profit = 0;
        const total = Number(res.data.course.price);
        const nigus_share = Number(res.data.course.nigus_share);
        const refer_amount = Number(res.data.course.refer_amount);
        const network_share = total - nigus_share;

        const nodes = {};

        data.purchases.forEach((p) => {
          if (!nodes[p.inviter_id]) {
            nodes[p.inviter_id] = {
              name: p.inviter_name,
              phone: null,
              children: [p.invitee_id],
            };
          } else {
            nodes[p.inviter_id].children.push(p.invitee_id);
          }
          if (!nodes[p.invitee_id]) {
            nodes[p.invitee_id] = {
              name: p.invitee_name,
              phone: p.phone_number,
              children: [],
            };
          } else {
            nodes[p.invitee_id].phone = p.phone_number;
          }
        });
        const build_tree = (nodes, root, visited = new Set()) => {
          if (!nodes[root] || visited.has(root)) return null; // stop if already visited
          visited.add(root);

          const node = nodes[root];

          // Profit calculations (adjust as needed)
          network_profit += network_share;
          nigus_profit += nigus_share;
          if (node.children.length === 2) network_profit -= refer_amount;
          set_potentials(
            (prev_val) => prev_val - (node.children.length - 2) / 2
          );

          return {
            name: node.name,
            phone: node.phone,
            children: node.children
              .map((child) => build_tree(nodes, child, visited))
              .filter(Boolean),
            child_count: node.children.length,
          };
        };

        const tree = build_tree(nodes, root_id);
        if (nodes[root_id]?.children?.length === 2)
          network_profit += refer_amount;
        nigus_profit -= nigus_share;
        network_profit -= network_share;
        if (network_profit < 0) network_profit = 0;
        if (nigus_profit < 0) nigus_profit = 0;
        setTreeDataAndProfits(tree, nigus_profit, network_profit);

        const wrapper = document.getElementById("treeWrapper");
        if (wrapper) {
          // const { width } = wrapper.getBoundingClientRect();
          const { width, height } = wrapper.getBoundingClientRect();
          set_translate({ x: width / 2, y: height * 0.1 }); // 10% from top
        }
      } catch (err) {
        console.error("Error fetching referral tree:", err);
      }
    }

    fetchData();
  }, []);

  const setTreeDataAndProfits = (tree, nigus, network) => {
    set_tree_data(tree || null);
    set_nigus_profit(nigus);
    set_network_profit(network);
  };

  const renderNode = ({ nodeDatum }) => {
    let fillColor = "#10B981";
    if (nodeDatum.child_count === 1) fillColor = "#F59E0B";
    else if (nodeDatum.child_count > 1) fillColor = "#3B82F6";

    const cardWidth = 160;
    const cardHeight = 44;
    const cardX = -cardWidth / 2;
    const cardY = -cardHeight / 2;

    return (
      <g>
        <title>{nodeDatum.phone || "No phone available"}</title>
        <rect
          rx="12"
          ry="12"
          x={cardX}
          y={cardY}
          width={cardWidth}
          height={cardHeight}
          fill="#ffffff"
          stroke="#E5E7EB"
        />
        <circle r={10} cx={cardX + 18} cy={0} fill={fillColor} />
        <text
          fill="#111827"
          fontSize="12"
          fontWeight={200}
          style={{ fontWeight: 200 }}
          textAnchor="middle"
          dominantBaseline="middle"
          x={cardX + 18 + (cardWidth - 36) / 2}
          y={0}
        >
          {nodeDatum.name}
        </text>
        <text
          fill="#111827"
          fontSize="10"
          fontWeight={100}
          style={{ fontWeight: 200 }}
          textAnchor="middle"
          dominantBaseline="middle"
          x={cardX + 18 + (cardWidth - 36) / 2}
          y={14}
        >
          {nodeDatum.phone}
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-800 dark:text-neutral-100">
              Referral Network
            </h1>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
              Visualize your tree and track profits at a glance.
            </p>
          </div>

          <div className="inline-flex overflow-hidden rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
            <button
              className={`px-3 py-2 text-sm font-medium transition ${
                selected_profit === "nigus"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800"
              }`}
              onClick={() => set_selected_profit("nigus")}
              aria-pressed={selected_profit === "nigus"}
            >
              Nigus
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium transition ${
                selected_profit === "network"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800"
              }`}
              onClick={() => set_selected_profit("network")}
              aria-pressed={selected_profit === "network"}
            >
              Network
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium transition ${
                selected_profit === "none"
                  ? "bg-slate-800 text-white"
                  : "text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800"
              }`}
              onClick={() => set_selected_profit("none")}
              aria-pressed={selected_profit === "none"}
            >
              Hide
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Total Purchases"
            value={total_purchases}
            accent="slate"
          />
          <StatCard
            label="Potential Slots"
            value={potentials.toFixed(1)}
            accent="amber"
          />
          <StatCard
            label="Nigus Profit"
            value={`${nigus_profit} Birr`}
            accent="emerald"
          />
          <StatCard
            label="Network Profit"
            value={`${network_profit} Birr`}
            accent="blue"
          />
        </div>

        {selected_profit !== "none" && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-neutral-200 shadow-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  selected_profit === "nigus" ? "bg-emerald-500" : "bg-blue-500"
                }`}
              />
              {profitText}
            </span>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10">
        <div
          id="treeWrapper"
          className="h-[70vh] rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
        >
          {tree_data && (
            <Tree
              data={tree_data}
              translate={translate}
              orientation="vertical"
              pathFunc="diagonal"
              collapsible={false}
              separation={{ siblings: 1.5, nonSiblings: 2 }}
              renderCustomNodeElement={renderNode}
              styles={{
                links: { stroke: "#CBD5E1", strokeWidth: 2 },
                nodes: {
                  node: { circle: { stroke: "#94A3B8", strokeWidth: 1 } },
                  leafNode: { circle: { stroke: "#94A3B8", strokeWidth: 1 } },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
