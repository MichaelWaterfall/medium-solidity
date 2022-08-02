import "./Rightbar.css";
import { Input } from "web3uikit";

const Rightbar = () => {
  const trends = [
    {
      text: "",
    },
    {
      text: "",
    },
    {
      text: "",
    },
    {
      text: "",
    },
  ];

  return (
    <>
      <div className="rightbarContent">
      <Input label="Search" name="Search" prefixIcon="search"></Input>

      <div className="trends">
        <a href="https://mumbaifaucet.com/">Fund your wallet using this link and start writing some blogs.</a>
        {''}
        {trends.map((e, i) => {
          return (
            <div key={i} className="trend">
              <div className="trendText">{e.text}</div>
            </div>
          )
        })}
      </div>
      </div>
    </>
  );
};

export default Rightbar;
