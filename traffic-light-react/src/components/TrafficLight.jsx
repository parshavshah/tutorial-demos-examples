import { useEffect, useState } from "react";

export default function TrafficLight() {
  const lights = {
    red: "red",
    yellow: "yellow",
    green: "green",
  };

  const [active, setActive] = useState(lights.red);

  useEffect(() => {
    if (active === lights.red) {
      setTimeout(() => {
        setActive(lights.yellow);
      }, 4000);
    } else if (active === lights.yellow) {
      setTimeout(() => {
        setActive(lights.green);
      }, 500);
    } else if (active === lights.green) {
      setTimeout(() => {
        setActive(lights.red);
      }, 3000);
    }
  });

  return (
    <>
      <h1>Traffic Light</h1>

      <div className="box">
        <div
          className="light red"
          style={active !== lights.red ? { opacity: 0.5 } : null}
        ></div>
        <div
          className="light yellow"
          style={active !== lights.yellow ? { opacity: 0.5 } : null}
        ></div>
        <div
          className="light green"
          style={active !== lights.green ? { opacity: 0.5 } : null}
        ></div>
      </div>
    </>
  );
}
