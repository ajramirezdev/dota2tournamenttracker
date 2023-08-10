import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import { LeaguesReducer, initialState } from "./LeaguesReducer";
import LeagueList from "./components/LeagueList";
import { Backdrop, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

function App() {
  const [state, dispatch] = useReducer(LeaguesReducer, initialState);
  const searchRef = useRef();

  const search = () => {
    const searchInput = searchRef.current.value;
    const searchLeagues = state.leagues.filter(
      (league) =>
        league.name.toLowerCase().includes(searchInput.toLowerCase()) &&
        league.tier !== "excluded"
    );

    dispatch({ type: "SET_SEARCH_LEAGUES", payload: searchLeagues });

    if (!searchInput.trim() || !searchLeagues.length) {
      dispatch({ type: "SET_RESULTS_FOUND", payload: false });
    } else {
      dispatch({ type: "SET_RESULTS_FOUND", payload: true });
    }
  };
  const enter = (e) => {
    e.key === "Enter" && search();
  };

  const loading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (response.status === 404) {
        throw new Error("Page not found");
      } else if (response.status === 500) {
        throw new Error("Server error");
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "SET_LEAGUES", payload: data });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData("https://api.opendota.com/api/leagues/");
  }, []);

  return (
    <>
      <div className="app-container">
        <div className="search-bar">
          <div className="app-name-desktop">
            Tournament <br /> Tracker
          </div>
          <div className="app-name">TournamentTracker</div>
          <div className="search-input-btn">
            <input
              className="search-input"
              onKeyDown={enter}
              type="text"
              placeholder="Search..."
              ref={searchRef}
            />
            <button onClick={search}>
              {state.resultsFound ? (
                <SearchIcon sx={{ fontSize: 18 }} />
              ) : (
                <SearchOffIcon sx={{ fontSize: 18, color: "#783593" }} />
              )}
            </button>
          </div>
        </div>
        <div className="league-list-container">
          {state.resultsFound ? (
            <LeagueList list={state.searchLeagues} loading={loading} />
          ) : (
            <div className="no-results">No Results Found...</div>
          )}
        </div>
        <Backdrop
          sx={{
            color: "#ad4bd5",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={state.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}

export default App;
