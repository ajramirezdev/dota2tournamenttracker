import { Link } from "react-router-dom";
import "./LeagueList.css";

const LeagueList = ({ list, loading }) => {
  return (
    <div>
      {list.map((league) => {
        return (
          <Link
            to={`${league.name.replaceAll(" ", "_")}/${league.leagueid}`}
            key={league.leagueid}
            className="league-list"
            onClick={loading}
          >
            <div className="league-card">
              <div className="league-info">
                <div className="league-name">{league.name}</div>
                <div className="league-id">LEAGUE ID: {league.leagueid}</div>
              </div>
              <img
                src="src/assets/right-arrow.png"
                alt="purple right arrow"
                width="20px"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LeagueList;
