import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import TeamList from "../components/TeamList";
import MatchList from "../components/MatchList";
import "./LeaguePage.css";
import { useReducer } from "react";
import { LeaguesReducer, initialState } from "../LeaguesReducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Backdrop, CircularProgress } from "@mui/material";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";

function LeaguePage() {
  const { matches, teams } = useLoaderData();
  const params = useParams();
  const sortedMatches = [...matches].sort(
    (a, b) => b.match_seq_num - a.match_seq_num
  );
  const [state, dispatch] = useReducer(LeaguesReducer, initialState);

  const dropdownTeams = () => {
    dispatch({ type: "SET_DROP_TEAMS" });
  };

  const dropdownMatches = () => {
    dispatch({ type: "SET_DROP_MATCHES" });
  };

  const teamLoading = () => {
    dispatch({ type: "SET_TEAM_LOADING" });
  };

  const loadMoreLeagueMatches = () => {
    dispatch({ type: "SET_LOAD_MORE_LEAGUE_MATCHES" });
  };

  return (
    <div>
      <Outlet
        context={{ matches: sortedMatches, teams: teams, loading: teamLoading }}
      />
      {params.teamId ? null : (
        <div className="league-page">
          <div className="league-header">
            <Link to={"/"}>
              <img
                className="back-btn"
                src="../src/assets/right-arrow.png"
                alt="purple arrow"
              />
            </Link>
            <div className="league-page-name">
              {params.leagueName.replaceAll("_", " ")}
            </div>
            <div className="league-id">LEAGUE ID: {params.leagueId}</div>
          </div>
          <div
            className="collapse-header"
            style={{ marginBottom: `${state.dropTeams ? "0" : "30px"}` }}
          >
            <div className="collapse-text">Participants</div>
            {state.dropTeams ? (
              <ExpandLessIcon
                style={{ cursor: "pointer" }}
                onClick={dropdownTeams}
              />
            ) : (
              <ExpandMoreIcon
                style={{ cursor: "pointer" }}
                onClick={dropdownTeams}
              />
            )}
          </div>
          {state.dropTeams ? (
            <TeamList loading={teamLoading} teams={teams} />
          ) : null}
          <Backdrop
            sx={{
              color: "#ad4bd5",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={state.isTeamLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div
            className="collapse-header"
            style={{ marginBottom: `${state.dropList ? "30px" : "0"}` }}
          >
            <div className="collapse-text">Recent Matches</div>
            {state.dropMatches ? (
              <ExpandLessIcon
                onClick={dropdownMatches}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <ExpandMoreIcon
                onClick={dropdownMatches}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
          {state.dropMatches ? (
            <>
              <MatchList
                matches={sortedMatches.slice(0, state.loadMoreLeagueMatches)}
                teams={teams}
              />
              <div className="load-more-container">
                <button onClick={loadMoreLeagueMatches}>Load More</button>
                <a className="back-to-top-btn" href="#">
                  <VerticalAlignTopIcon
                    sx={{ fontSize: 26, color: "#ad4bd5" }}
                  />
                </a>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default LeaguePage;
