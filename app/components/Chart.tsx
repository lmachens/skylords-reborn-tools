import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Chart = ({ series, title }) => {
  return (
    <ReactApexChart
      options={{
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy HH:mm",
          },
        },
        stroke: {
          curve: "smooth",
        },
        toolbar: {
          show: false,
          autoSelected: "pan",
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8,
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        title: {
          text: title,
          align: "left",
        },
      }}
      series={series}
      type="area"
      width="500"
    />
  );
};

export default Chart;
