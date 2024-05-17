import BarChart from "./components/BarChart";
const Home = () => {
  return (
    <div>
      <BarChart
        xData={["Vue", "React", "Angular"]}
        sData={[2000, 5000, 1000]}
        title={{text: "前端技术栈使用热度", subtext: "2021年"}}
      />

      <BarChart
        xData={["Vue", "React", "Angular"]}
        sData={[200, 500, 100]}
        style={{ width: "500px", height: "400px" }}
      />
    </div>
  );
};
export default Home;
