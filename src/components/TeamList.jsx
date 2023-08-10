import { Link } from "react-router-dom";
import "./TeamList.css";
import GroupsIcon from "@mui/icons-material/Groups";

const TeamList = ({ teams, loading }) => {
  return (
    <div className="team-list">
      {teams.map((team) => (
        <Link
          className="team-link"
          to={`${team.name.replaceAll(" ", "_")}/${team.team_id}`}
          key={team.team_id}
          onClick={loading}
        >
          <div className="team-card">
            {team.logo_url ? (
              <img
                className="team-logo"
                width={"100px"}
                src={team.logo_url}
                style={{ backgroundColor: "black" }}
                alt={`${team.name} logo`}
              />
            ) : (
              <GroupsIcon sx={{ fontSize: 70, width: 100 }} />
            )}
            <div className="team-info">
              <div className="team-name">{team.name}</div>
              <div className="team-id">TEAM ID: {team.team_id}</div>
              <div className="win-loss">
                {team.wins}W - {team.losses}L
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TeamList;
