import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LeaguePage from "./pages/LeaguePage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: ":leagueName/:leagueId",
    element: <LeaguePage />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => {
      try {
        const leagueMatches = await fetch(
          `https://api.opendota.com/api/leagues/${params.leagueId}/matches`
        );
        const leagueTeams = await fetch(
          `https://api.opendota.com/api/leagues/${params.leagueId}/teams`
        );
        if (leagueMatches.status === 404 || leagueTeams.status === 404) {
          throw new Error("Page not found");
        } else if (leagueMatches.status === 500 || leagueTeams.status === 500) {
          throw new Error("Server error");
        } else if (!leagueMatches.ok) {
          throw new Error(`HTTP error! status: ${leagueMatches.status}`);
        } else if (!leagueTeams.ok) {
          throw new Error(`HTTP error! status: ${leagueTeams.status}`);
        }
        return {
          matches: await leagueMatches.json(),
          teams: await leagueTeams.json(),
        };
      } catch (error) {
        console.error(error);
      }
    },
    children: [
      {
        path: ":teamName/:teamId",
        element: <TeamPage />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          try {
            const team = await fetch(
              `https://api.opendota.com/api/teams/${params.teamId}`
            );
            const teamPlayers = await fetch(
              `https://api.opendota.com/api/teams/${params.teamId}/players`
            );
            if (team.status === 404 || teamPlayers.status === 404) {
              throw new Error("Page not found");
            } else if (team.status === 500 || teamPlayers.status === 500) {
              throw new Error("Server error");
            } else if (!team.ok) {
              throw new Error(`HTTP error! status: ${team.status}`);
            } else if (!teamPlayers.ok) {
              throw new Error(`HTTP error! status: ${teamPlayers.status}`);
            }
            return {
              team: await team.json(),
              players: await teamPlayers.json(),
            };
          } catch (error) {
            console.log(error.message);
          }
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
