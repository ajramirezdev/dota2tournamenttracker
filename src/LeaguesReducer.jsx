export const initialState = {
  leagues: [],
  searchLeagues: [],
  resultsFound: true,
  loadMoreLeagueMatches: 10,
  loadMoreTeamMatches: 5,
  dropTeams: true,
  dropMatches: true,
  dropTeamMatches: false,
  dropPlayers: true,
  isLoading: false,
  isTeamLoading: false,
};

export const LeaguesReducer = (state, action) => {
  switch (action.type) {
    case "SET_LEAGUES":
      return { ...state, leagues: action.payload };
    case "SET_SEARCH_LEAGUES":
      return { ...state, searchLeagues: action.payload };
    case "SET_RESULTS_FOUND":
      return { ...state, resultsFound: action.payload };
    case "SET_LOAD_MORE_LEAGUE_MATCHES":
      return {
        ...state,
        loadMoreLeagueMatches: state.loadMoreLeagueMatches + 10,
      };
    case "SET_LOAD_MORE_TEAM_MATCHES":
      return {
        ...state,
        loadMoreTeamMatches: state.loadMoreTeamMatches + 5,
      };
    case "SET_DROP_TEAMS":
      return { ...state, dropTeams: !state.dropTeams };
    case "SET_DROP_MATCHES":
      return { ...state, dropMatches: !state.dropMatches };
    case "SET_DROP_TEAM_MATCHES":
      return { ...state, dropTeamMatches: !state.dropTeamMatches };
    case "SET_DROP_PLAYERS":
      return { ...state, dropPlayers: !state.dropPlayers };
    case "SET_LOADING":
      return { ...state, isLoading: !state.isLoading };
    case "SET_TEAM_LOADING":
      return { ...state, isTeamLoading: !state.isTeamLoading };
    default:
      return state;
  }
};
