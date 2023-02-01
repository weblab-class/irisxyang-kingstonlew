import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

const Archive = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    get("/api/archive").then((archive) => {
      setEntries(archive);
    });
  }, []);
  return (
    <div className="flex flex-column items-center">
      <h1 className="tc ma4 page-title">ARCHIVE</h1>
      <div className="flex flex-row flex-wrap w-80 justify-center">
        {entries.map(([date, word]) => (
          <Link to={`/day/${date}`}>
            <div className="primary-background pa3 fw1 f3 black ma3">
              {moment(date).format("MM/DD/YY")}: {word}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Archive;
