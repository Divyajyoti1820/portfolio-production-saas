import { format } from "date-fns";

const Home = () => {
  return (
    <div className="w-[480px] bg-black flex flex-col items-center justify-start h-[500px] border-blue-800 rounded-md">
      <div className="w-full flex justify-between p-2 border-b-2 border-blue-500">
        <p className="text-xs">Divyajyoti</p>
        <p className="text-xs">{format(Date.now(), "dd MMM y | EEEE")}</p>
      </div>
      <div className="w-full flex-1 p-2 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">Productivity</h1>
        <p className="text-[10px]">Software as a Service</p>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
