import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import MatchList from "../components/MatchList";
import arrow from "../assets/right-arrow.png";
import "./TeamPage.css";
import { useReducer } from "react";
import { LeaguesReducer, initialState } from "../LeaguesReducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PlayerList from "../components/PlayerList";
import GroupsIcon from "@mui/icons-material/Groups";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";

const TeamPage = () => {
  const [state, dispatch] = useReducer(LeaguesReducer, initialState);
  const { team, players } = useLoaderData();
  const { matches, teams, loading } = useOutletContext();
  const params = useParams();
  const teamMatches = [...matches].filter(
    (match) =>
      match.dire_team_id === team.team_id ||
      match.radiant_team_id === team.team_id
  );

  const dropdownTeamMatches = () => {
    dispatch({ type: "SET_DROP_TEAM_MATCHES" });
  };

  const dropdownPlayers = () => {
    dispatch({ type: "SET_DROP_PLAYERS" });
  };

  const loadMoreTeamMatches = () => {
    dispatch({ type: "SET_LOAD_MORE_TEAM_MATCHES" });
  };

  return (
    <div className="team-page">
      <div className="team-header">
        <div className="team-container">
          <Link onClick={loading} to="..">
            <img className="back-btn" src={arrow} alt="purple arrow" />
          </Link>
          {team.logo_url ? (
            <img
              className="team-page-logo"
              src={team.logo_url}
              alt={`${team.name} logo`}
            />
          ) : (
            <GroupsIcon sx={{ fontSize: 140 }} />
          )}
        </div>
        <div className="team-page-name">{team.name}</div>
        <div className="team-page-id">TEAM ID: {team.team_id}</div>
      </div>

      <div
        className="collapse-header"
        style={{ marginBottom: `${state.dropPlayers ? "0" : "30px"}` }}
      >
        <div className="collapse-text">
          <div>Players</div>
        </div>
        {state.dropPlayers ? (
          <ExpandLessIcon
            onClick={dropdownPlayers}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <ExpandMoreIcon
            onClick={dropdownPlayers}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      {state.dropPlayers ? <PlayerList players={players} team={team} /> : null}
      <div className="collapse-header">
        <div className="collapse-text">
          <div>{team.name} Matches</div>
          <div>in {params.leagueName.replaceAll("_", " ")}</div>
        </div>
        {state.dropTeamMatches ? (
          <ExpandLessIcon
            onClick={dropdownTeamMatches}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <ExpandMoreIcon
            onClick={dropdownTeamMatches}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      {state.dropTeamMatches ? (
        <>
          <MatchList
            matches={teamMatches.slice(0, state.loadMoreTeamMatches)}
            teams={teams}
          />
          <div className="load-more-container">
            <button onClick={loadMoreTeamMatches}>Load More</button>
            <a className="back-to-top-btn" href="#">
              <VerticalAlignTopIcon sx={{ fontSize: 26, color: "#ad4bd5" }} />
            </a>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TeamPage;
