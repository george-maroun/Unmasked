import React from "react";
import 'chart.js/auto';
import { Pie } from "react-chartjs-2";


function PieChart(props) {

  if (!props.metrics) {
    return <div>Loading chart...</div>
  }

  const labels = props.metrics.map((token) => token.name);
  const datasets = [
    {
      label: "Wallet diversity",
      data: props.metrics.map((token) => parseInt(token["amount_usd"] / props.value * 100)),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0"
      ],
      borderColor: "black",
      borderWidth: 2
    }
  ];
  const data = {labels, datasets};

  return (
    <div>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Wallet diversity",
              color: "rgb(228, 228, 248)",
              fullSize: true
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;


