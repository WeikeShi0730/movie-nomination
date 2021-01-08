import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";

import { getNominationData } from "../../firebase/firebase.utils";

import "./dashboard.styles.scss";

function Dashboard() {
  const [topPicks, setTopPicks] = useState({
    labels: [],
    votes: [],
    total: 0,
  });
  var labels = [];
  var votes = [];
  useEffect(() => {
    const getData = async () => {
      const nominationData = await getNominationData();
      const nominatedList = nominationData.list;
      const total = nominationData.total;
      nominatedList.forEach((movie) => {
        labels.push(movie.title);
        votes.push(movie.total);
      });
      setTopPicks({
        labels: labels,
        votes: votes,
        total: total,
      });
    };
    getData();

    return () =>
      setTopPicks({
        labels: [],
        votes: [],
        total: 0,
      });
  }, []);

  const data = {
    labels: topPicks.labels,
    datasets: [
      {
        label: "# of Votes",
        data: topPicks.votes,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      labels: {
        fontColor: "White",
        fontSize: 25,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontSize: 15,
            fontColor: "White",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
            fontSize: 15,
            fontColor: "White",
          },
        },
      ],
    },
  };

  return (
    <div>
      <h1 className="title">NOMINATION DASHBOARD (TOP 6)</h1>
      <div className="chart">
        <HorizontalBar data={data} width={100} height={30} options={options} />
      </div>
      <h2>Total Votes: {topPicks.total}</h2>
    </div>
  );
}

export default Dashboard;
