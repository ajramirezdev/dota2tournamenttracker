import "./MatchList.css";
import GroupsIcon from "@mui/icons-material/Groups";

const MatchList = ({ matches, teams }) => {
  return (
    <>
      {matches.map((match) => {
        const direTeam = teams.find(
          (team) => team.team_id === match.dire_team_id
        );
        const radiantTeam = teams.find(
          (team) => team.team_id === match.radiant_team_id
        );
        return (
          <div className="match-card" key={match.match_id}>
            {direTeam.logo_url ? (
              <img
                className="match-team-logo"
                src={direTeam.logo_url}
                alt={`${direTeam.name} logo`}
              />
            ) : (
              <GroupsIcon sx={{ fontSize: 70, width: "10%" }} />
            )}
            <div className="match-team-name">{direTeam.name}</div>
            <div className="match-score">{match.dire_score}</div>
            {match.radiant_win ? (
              <div className="win-loss-text">
                {" "}
                LOSE - <span className="win-text">WIN</span>{" "}
              </div>
            ) : (
              <div className="win-loss-text">
                {" "}
                <span className="win-text">WIN</span> - LOSE{" "}
              </div>
            )}
            <div className="match-score">{match.radiant_score}</div>
            <div className="match-team-name">{radiantTeam.name}</div>
            {radiantTeam.logo_url ? (
              <img
                className="match-team-logo"
                src={radiantTeam.logo_url}
                alt={`${radiantTeam.name} logo`}
              />
            ) : (
              <GroupsIcon sx={{ fontSize: 70, width: "10%" }} />
            )}
            <div className="match-id">MATCH ID: {match.match_id}</div>
          </div>
        );
      })}
    </>
  );
};

export default MatchList;
