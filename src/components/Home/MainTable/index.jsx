import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const data = [
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
  {
    League: "Premier League",
    Time: "14:30",
    "Event/Markets": "Football Match",
    "Bet 1": "Team A Win",
    "Selection 1": "Team A",
    "Bet 2": "Team B Win",
    "Selection 2": "Team B",
    Rating: "4.5",
    "Free Bet Rating": "3.5",
  },
];

const columns = [
  "League",
  "Time",
  "Event/Markets",
  "Bet 1",
  "Selection 1",
  "Bet 2",
  "Selection 2",
  "Rating",
  "Free Bet Rating",
];

const MainTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow
            sx={{ backgroundColor: "#f0f0f0", position: "sticky", top: 0 }}
          >
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{ border: "1px solid #ddd", padding: "8px" }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  sx={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
