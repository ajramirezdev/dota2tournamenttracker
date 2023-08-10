import "./PlayerList.css";
import PersonIcon from "@mui/icons-material/Person";

const PlayerList = ({ players, team }) => {
  return (
    <div className="player-list">
      {players.length > 5
        ? [...players]
            .filter((player) => player.is_current_team_member)
            .slice(0, 5)
            .map((player) => (
              <div className="player-card" key={player.account_id}>
                <PersonIcon
                  className="playerIcon"
                  style={{ width: "105px", height: "105px" }}
                />
                <div>
                  <div className="player-ign">
                    {team.tag}.{player.name}
                  </div>
                  <div className="player-id">
                    PLAYER ID: {player.account_id}
                  </div>
                </div>
                <div className="player-stats">
                  {player.wins}W - {player.games_played - player.wins}L{" "}
                  {Math.floor((player.wins / player.games_played) * 100)}%WR
                </div>
              </div>
            ))
        : players.map((player) => (
            <div className="player-card" key={player.account_id}>
              <PersonIcon
                className="playerIcon"
                style={{ width: "105px", height: "105px" }}
              />
              <div>
                <div className="player-ign">
                  {team.tag}.{player.name}
                </div>
                <div className="player-id">PLAYER ID: {player.account_id}</div>
              </div>
              <div className="player-stats">
                {player.wins}W - {player.games_played - player.wins}L{" "}
                {Math.floor((player.wins / player.games_played) * 100)}%WR
              </div>
            </div>
          ))}
    </div>
  );
};

export default PlayerList;
