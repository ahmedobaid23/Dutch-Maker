/* eslint-disable eqeqeq */
import React, { useState } from "react";
import InputField from "../../components/common/InputField";
import Dropdown from "../../components/common/Dropdown";
import SingleSelectDropdown from "../../components/common/SingleSelectDropdown";
import "./styles.css";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material-next/Button";
import GridLoader from "react-spinners/GridLoader";
import {
  TableContainer,
  TablePagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import "./styles.css";

const gridTemplate = `
  "a b"
  "c d"
  "e f"
`;

const sports = [
  {
    id: 1,
    bet1: "baseball_mlb",
    bet2: 109,
    label: "MLB - Baseball",
    allowedMarkets: ["Spread", "Moneyline", "Totals"],
  },
  {
    id: 2,
    bet1: "americanfootball_nfl",
    bet2: 31,
    label: "NFL - Football",
    allowedMarkets: ["Spread", "Moneyline", "Totals"],
  },
  {
    id: 3,
    bet1: "americanfootball_ncaaf",
    bet2: 28370,
    label: "NCAAF - Football",
    allowedMarkets: ["Spread", "Moneyline", "Totals"],
  },
  {
    id: 4,
    bet1: "basketball_ncaab",
    bet2: 15,
    label: "NCAAB - Basketball",
    allowedMarkets: ["Spread", "Moneyline", "Totals"],
  },
];

const markets = [
  { id: 1, bet1: "spreads", bet2: "spread", label: "Spread" },
  { id: 2, bet1: "h2h", bet2: "moneyline", label: "Moneyline" },
  {
    id: 3,
    bet1: "totals",
    bet2: "total",
    label: "Totals",
  },
];

const primary = [
  { id: 1, key: "fanduel", label: "FanDuel" },

  { id: 2, key: "draftkings", label: "DraftKings" },

  { id: 3, key: "betus", label: "BetUS" },

  { id: 4, key: "lowvig", label: "LowVig.ag" },

  { id: 5, key: "betonlineag", label: "BetOnline.ag" },

  { id: 6, key: "williamhill_us", label: "William Hill (US)" },

  { id: 7, key: "superbook", label: "SuperBook" },

  { id: 8, key: "bovada", label: "Bovada" },

  { id: 9, key: "mybookieag", label: "MyBookie.ag" },

  { id: 10, key: "twinspires", label: "TwinSpires" },

  { id: 11, key: "unibet_us", label: "Unibet" },

  { id: 12, key: "betrivers", label: "BetRivers" },

  { id: 13, key: "wynnbet", label: "WynnBET" },

  { id: 14, key: "pointsbetus", label: "PointsBet (US)" },

  { id: 15, key: "barstool", label: "Barstool Sportsbook" },

  { id: 16, key: "betmgm", label: "BetMGM" },
];

const secondary = [
  { id: 1, key: "prophetexchange", label: "Prophet Exchange" },
];

// BASE URLS
const BASE_URL1 = "https://api-nj.prophetbettingexchange.com/partner";
const BASE_URL2 = "https://api.the-odds-api.com/v4/sports";

// API KEYS
const API_KEY1 = process.env.REACT_APP_PROPHET_EXCHANGE_API_KEY;
const API_KEY2 = process.env.REACT_APP_ODDS_API_KEY;
var data = [];

const columns = [
  "League",
  "Time",
  "Event/Market",
  "Bet 1",
  "Selection 1",
  "Bet 2",
  "Selection 2",
  "Rating",
  "Free Bet Rating",
];

const Home = () => {
  const [state, setState] = useState({
    sports: sports.map((sport) => sport.label),
    markets: markets.map((market) => market.label),
    primarySportsBook: "",
    secondarySportsBook: "Prophet Exchange",
    minRating: "80",
    maxRating: "130",
    minFreeBetRating: "1",
    maxFreeBetRating: "130",
    minOdds: "-500",
    maxOdds: "-5000",
  });
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const allSports = sports.map((sport) => sport.label);
  const allMarkets = markets.map((market) => market.label);
  var isAllSelected;

  const handleClick = async (event) => {
    setLoading(true);
    var bookmaker;
    var resultsBet1 = [];
    var resultsBet2 = [];
    var eventIdsBet2 = [];
    var sportEventsBet2 = [];
    var sportEventsRowsBet2 = [];
    var selectedMarketsBet1 = [];
    var selectedMarketsBet2 = [];
    var selectedSportsBet1 = [];
    var selectedSportsBet2 = [];
    var rows = [];
    var rows2 = [];
    data = [];

    state.markets.forEach((selectedMarket) => {
      markets.forEach((market) => {
        if (selectedMarket == market.label) {
          selectedMarketsBet1.push(market.bet1);
          selectedMarketsBet2.push(market.bet2);
        }
      });
    });

    state.sports.forEach((selectedSport) => {
      sports.forEach((sport) => {
        if (selectedSport == sport.label) {
          selectedSportsBet1.push(sport.bet1);
          selectedSportsBet2.push(sport.bet2);
        }
      });
    });

    primary.forEach((bookmaker_) => {
      if (state.primarySportsBook == bookmaker_.label) {
        bookmaker = bookmaker_.key;
      }
    });

    const getSportingOdds = async (sport, markets) => {
      try {
        const response = await fetch(
          `${BASE_URL2}/${sport}/odds?apiKey=${API_KEY2}&regions=us&markets=${markets}&dateFormat=iso&oddsFormat=decimal`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const events = await response.json();
        events.forEach((event) => {
          resultsBet1.push(event);
        });

        if (response.status !== 200) {
          console.error("Error response from server:", response.data);
          throw new Error("Failed to fetch sporting events");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getSportEventsP = async (tournament_id) => {
      try {
        const response = await fetch(
          `${BASE_URL1}/affiliate/get_sport_events?tournament_id=${tournament_id}`,
          {
            headers: {
              Authorization: API_KEY1,
              "Content-Type": "application/json",
            },
          }
        );
        const events = await response.json();
        if (response.status !== 200) {
          console.error("Error response from server:", response.data);
          throw new Error("Failed to fetch sporting events");
        }
        events.data.sport_events.forEach((event) => {
          eventIdsBet2.push(event.event_id);
          sportEventsBet2.push(event);
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getSportingOddsPBYEventsList = async (eventsList) => {
      try {
        const response = await fetch(
          `${BASE_URL1}/affiliate//get_multiple_markets?event_ids=${eventsList}`,
          {
            headers: {
              Authorization: API_KEY1,
              "Content-Type": "application/json",
            },
          }
        );
        const events = await response.json();
        resultsBet2 = events.data;

        if (response.status !== 200) {
          console.error("Error response from server:", response.data);
          throw new Error("Failed to fetch sporting events");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSportOddsPromises = selectedSportsBet1.map((sport) =>
      getSportingOdds(sport, selectedMarketsBet1.join(","))
    );

    try {
      await Promise.all(fetchSportOddsPromises);
    } catch (error) {
      console.error("Error fetching sport events:", error);
    }

    const decimalToAmericanOdds = (decimal) => {
      if (decimal < 2.5) {
        return -100 / (decimal - 1);
      } else if (decimal >= 2.5) {
        return (decimal - 1) * 100;
      }
    };

    resultsBet1.forEach((event) => {
      event.bookmakers.forEach((bookmaker_) => {
        if (bookmaker_.key == bookmaker) {
          bookmaker_.markets.forEach((market) => {
            if (market.key == "h2h") {
              const rowHome = {
                sport: event.sport_title,
                time: event.commence_time,
                homeTeam: event.home_team,
                awayTeam: event.away_team,
                bookmaker: bookmaker,
                market: "Moneyline",
                selection1: "",
                odd1: "",
                selection2: "",
                odd2: "",
              };

              market.outcomes.forEach((outcome) => {
                if (rowHome.homeTeam == outcome.name) {
                  rowHome.selection1 = "Home";
                  rowHome.odd1 = decimalToAmericanOdds(outcome.price);
                }
              });

              rows.push(rowHome);

              const rowAway = {
                sport: event.sport_title,
                time: event.commence_time,
                homeTeam: event.home_team,
                awayTeam: event.away_team,
                bookmaker: bookmaker,
                market: "Moneyline",
                selection1: "",
                odd1: "",
                selection2: "",
                odd2: "",
              };

              market.outcomes.forEach((outcome) => {
                if (rowAway.awayTeam == outcome.name) {
                  rowAway.selection1 = "Away";
                  rowAway.odd1 = decimalToAmericanOdds(outcome.price);
                }
              });

              rows.push(rowAway);
            } else if (market.key == "spreads") {
              const rowHome = {
                sport: event.sport_title,
                time: event.commence_time,
                homeTeam: event.home_team,
                awayTeam: event.away_team,
                bookmaker: bookmaker,
                market: "Spread",
                selection1: "",
                odd1: "",
                selection2: "",
                odd2: "",
              };

              market.outcomes.forEach((outcome) => {
                if (rowHome.homeTeam == outcome.name) {
                  if (market.outcomes[0].point > 0) {
                    rowHome.selection1 = "Home +" + outcome.point;
                  } else if (outcome.point < 0) {
                    rowHome.selection1 =
                      "Home " + decimalToAmericanOdds(outcome.price);
                  }
                  rowHome.odd1 = decimalToAmericanOdds(outcome.price);
                }
              });

              rows.push(rowHome);

              const rowAway = {
                sport: event.sport_title,
                time: event.commence_time,
                homeTeam: event.home_team,
                awayTeam: event.away_team,
                bookmaker: bookmaker,
                market: "Spread",
                selection1: "",
                odd1: "",
                selection2: "",
                odd2: "",
              };

              market.outcomes.forEach((outcome) => {
                if (rowAway.awayTeam == outcome.name) {
                  if (market.outcomes[0].point > 0) {
                    rowAway.selection1 = "Away +" + outcome.point;
                  } else if (outcome.point < 0) {
                    rowAway.selection1 =
                      "Away " + decimalToAmericanOdds(outcome.price);
                  }
                  rowAway.odd1 = decimalToAmericanOdds(outcome.price);
                }
              });

              rows.push(rowAway);
            } else if (market.key == "totals") {
              const rowHome = {
                sport: event.sport_title,
                time: event.commence_time,
                homeTeam: event.home_team,
                awayTeam: event.away_team,
                bookmaker: bookmaker,
                market: "Totals",
                selection1: "",
                odd1: "",
                selection2: "",
                odd2: "",
              };

              market.outcomes.forEach((outcome) => {
                if (rowHome.homeTeam == outcome.name) {
                  rowHome.selection1 = outcome.name + " " + outcome.point;
                  rowHome.odd1 = decimalToAmericanOdds(outcome.price);
                }
              });

              rows.push(rowHome);

              const rowAway = {
                sport: event.sport_title,
                time: event.commence_time,
                homeTeam: event.home_team,
                awayTeam: event.away_team,
                bookmaker: bookmaker,
                market: "Totals",
                selection1:
                  market.outcomes[1].name + " " + market.outcomes[1].point,
                odd1: decimalToAmericanOdds(market.outcomes[1].price),
                selection2: "",
                odd2: "",
              };

              market.outcomes.forEach((outcome) => {
                if (rowAway.awayTeam == outcome.name) {
                  rowAway.selection1 = outcome.name + " " + outcome.point;
                  rowAway.odd1 = decimalToAmericanOdds(outcome.price);
                }
              });

              rows.push(rowAway);
            }
          });
        }
      });
    });

    const fetchSportEventsPromises = selectedSportsBet2.map((sport) =>
      getSportEventsP(sport)
    );

    try {
      await Promise.all(fetchSportEventsPromises);
    } catch (error) {
      console.error("Error fetching sport events:", error);
    }

    sportEventsBet2.forEach((event) => {
      const row = {
        id: event.event_id,
        sport: event.tournament_name,
        time: event.scheduled,
        homeTeam: event.competitors[0].name,
        awayTeam: event.competitors[1].name,
      };
      sportEventsRowsBet2.push(row);
    });

    const fetchSportingOddsPromise = getSportingOddsPBYEventsList(
      eventIdsBet2.join(",")
    );

    try {
      await fetchSportingOddsPromise;
    } catch (error) {
      console.error("Error fetching sporting odds:", error);
    }

    sportEventsRowsBet2.forEach((event) => {
      resultsBet2[event.id].forEach((result) => {
        if (result.type == "moneyline") {
          const rowHome = {
            sport: event.sport,
            time: event.time,
            homeTeam: event.homeTeam,
            awayTeam: event.awayTeam,
            market: "Moneyline",
            selection1: "",
            odd1: "",
            selection2: "Home",
            odd2: result.selections[0].display_odds,
          };

          rows2.push(rowHome);

          const rowAway = {
            sport: event.sport,
            time: event.time,
            homeTeam: event.homeTeam,
            awayTeam: event.awayTeam,
            market: "Moneyline",
            selection1: "",
            odd1: "",
            selection2: "Away",
            odd2: result.selections[1].display_odds,
          };

          rows2.push(rowAway);
        } else if (result.type == "spread") {
          const rowHome = {
            sport: event.sport,
            time: event.time,
            homeTeam: event.homeTeam,
            awayTeam: event.awayTeam,
            market: "Spread",
            selection1: "",
            odd1: "",
            selection2: "Home " + result.selections[0].display_line,
            odd2: result.selections[0].display_odds,
          };

          rows2.push(rowHome);

          const rowAway = {
            sport: event.sport,
            time: event.time,
            homeTeam: event.homeTeam,
            awayTeam: event.awayTeam,
            market: "Spread",
            selection1: "",
            odd1: "",
            selection2: "Away " + result.selections[1].display_line,
            odd2: result.selections[1].display_odds,
          };

          rows2.push(rowAway);
        } else if (result.type == "total") {
          const rowHome = {
            sport: event.sport,
            time: event.time,
            homeTeam: event.homeTeam,
            awayTeam: event.awayTeam,
            market: "Totals",
            selection1: "",
            odd1: "",
            selection2: "Under " + result.selections[0].display_line,
            odd2: result.selections[0].display_odds,
          };

          rows2.push(rowHome);

          const rowAway = {
            sport: event.sport,
            time: event.time,
            homeTeam: event.homeTeam,
            awayTeam: event.awayTeam,
            market: "Totals",
            selection1: "",
            odd1: "",
            selection2: "Over " + result.selections[1].display_line,
            odd2: result.selections[1].display_odds,
          };

          rows2.push(rowAway);
        }
      });
    });

    rows.forEach((bet1) => {
      rows2.forEach((bet2) => {
        if (
          bet1.sport == bet2.sport &&
          bet1.homeTeam === bet2.homeTeam &&
          bet1.awayTeam === bet2.awayTeam &&
          bet1.market == bet2.market &&
          bet1.selection1 != bet2.selection2
        ) {
          if (bet1.market == "Moneyline") {
            if (bet1.selection1 != bet2.selection2) {
              const row = {
                sport: bet1.sport,
                time: bet1.time,
                homeTeam: bet1.homeTeam,
                awayTeam: bet2.awayTeam,
                market: "Moneyline",
                bookmaker: bet1.bookmaker,
                selection1: bet1.selection1,
                odd1: bet1.odd1,
                selection2: bet2.selection2,
                odd2: bet2.odd2,
              };

              data.push(row);
            }
          } else if (bet1.market == "Spread") {
            var selection1;
            var selection2;
            var price1;
            var price2;
            try {
              selection1 = bet1.selection1.split(" ");
              selection2 = bet2.selection2.split(" ");
              price1 = selection1[1].slice(1);
              price2 = selection2[1].slice(1);
              if (
                selection1[0] != selection2[0] &&
                price1 == price2 &&
                selection1[1] != selection2[1]
              ) {
                const row = {
                  sport: bet1.sport,
                  time: bet1.time,
                  homeTeam: bet1.homeTeam,
                  awayTeam: bet2.awayTeam,
                  market: "Spread",
                  bookmaker: bet1.bookmaker,
                  selection1: bet1.selection1,
                  odd1: bet1.odd1,
                  selection2: bet2.selection2,
                  odd2: bet2.odd2,
                };

                data.push(row);
              }
            } catch (e) {
              console.log(e);
            }
          } else if (bet1.market == "Totals") {
            const selection1 = bet1.selection1.split(" ");
            const selection2 = bet2.selection2.split(" ");

            if (
              selection1[0] != selection2[0] &&
              selection1[1] == selection2[1]
            ) {
              const row = {
                sport: bet1.sport,
                time: bet1.time,
                homeTeam: bet1.homeTeam,
                awayTeam: bet2.awayTeam,
                market: "Totals",
                bookmaker: bet1.bookmaker,
                selection1: bet1.selection1,
                odd1: bet1.odd1,
                selection2: bet2.selection2,
                odd2: bet2.odd2,
              };

              data.push(row);
            }
          }
        }
      });
    });
    setTableData(data);
    setLoading(false);
  };

  const handleValue = (event) => {
    const name = event.target.name;
    var value;

    switch (name) {
      case "sports":
        value = event.target.value;
        isAllSelected = name.length > 0 && state[name].length === name.length;

        if (value.includes("all")) {
          setState((prevValue) => {
            return {
              ...prevValue,
              [name]:
                (state[name] && state[name].length) ===
                (sports && sports.length)
                  ? []
                  : allSports,
            };
          });
          return;
        }
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "markets":
        value = event.target.value;
        isAllSelected = name.length > 0 && state[name].length === name.length;
        if (value.includes("all")) {
          setState((prevValue) => {
            return {
              ...prevValue,
              [name]:
                (state[name] && state[name].length) ===
                (markets && markets.length)
                  ? []
                  : allMarkets,
            };
          });
          return;
        }
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "primarySportsBook":
        value = event.target.value;
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "secondarySportsBook":
        value = event.target.value;
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "minRating":
        value = event.target.value;
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "maxRating":
        value = event.target.value;
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "minFreeBetRating":
        value = event.target.value;
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "maxFreeBetRating":
        value = event.target.value;
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "minOdds":
        value = event.target.value;
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      case "maxOdds":
        value = event.target.value;
        setState((prevValue) => {
          return {
            ...prevValue,
            [name]: value,
          };
        });
        break;

      default:
        break;
    }
  };

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div className="home">
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          <div className="filterPanel">
            <div className="top">
              <div className="icon">
                <TuneIcon
                  sx={{
                    color: "#f21285",
                    height: "45px",
                    width: "45px",
                  }}
                />
                <p>FILTER</p>
              </div>
              <div className="refresh-button">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f21285",
                    width: "20rem",
                    borderRadius: "10px",
                    marginTop: "15px",
                    marginBottom: "25px",
                    padding: "0.2rem",
                    fontSize: "25px",
                    color: "white",
                    fontFamily: "Raleway",
                  }}
                  onClick={handleClick}
                >
                  Apply Filters
                </Button>
              </div>
            </div>

            <Dropdown
              options={sports}
              name="sports"
              label="SPORTS"
              value={state.sports}
              handleValue={handleValue}
              isAllSelected={isAllSelected}
              all={allSports}
            />
            <Dropdown
              options={markets}
              name="markets"
              label="MARKETS"
              value={state.markets}
              handleValue={handleValue}
              isAllSelected={isAllSelected}
              all={allMarkets}
            />
            <SingleSelectDropdown
              options={primary}
              name="primarySportsBook"
              label="PRIMARY SPORTSBOOK"
              value={state.primarySportsBook}
              handleValue={handleValue}
            />
            <SingleSelectDropdown
              options={secondary}
              name="secondarySportsBook"
              label="SECONDARY SPORTSBOOK"
              value={state.secondarySportsBook}
              handleValue={handleValue}
            />

            <div
              className="input-fields"
              style={{
                display: "grid",
                gap: "1.5rem",
                gridTemplateAreas: gridTemplate,
              }}
            >
              <InputField
                label="MIN RATING"
                name="minRating"
                value={state.minRating}
                handleValue={handleValue}
              />
              <InputField
                label="MAX RATING"
                name="maxRating"
                value={state.maxRating}
                handleValue={handleValue}
              />
              <InputField
                label="MIN FREE BET RATING"
                name="minFreeBetRating"
                value={state.minFreeBetRating}
                handleValue={handleValue}
              />
              <InputField
                label="MAX FREE BET RATING"
                name="maxFreeBetRating"
                value={state.maxFreeBetRating}
                handleValue={handleValue}
              />
              <InputField
                label="MIN ODDS"
                name="minOdds"
                value={state.minOdds}
                handleValue={handleValue}
              />
              <InputField
                label="MAX ODDS"
                name="maxOdds"
                value={state.maxOdds}
                handleValue={handleValue}
              />
            </div>
          </div>
        </div>
        <div className="home_list-wrap">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#e1e1e1",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column}
                      sx={{
                        borderRight: "1px solid #BBB",
                        padding: "1rem",
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: "1rem",
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading ? (
                  tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell
                            key={column}
                            sx={{ border: "1px solid #ddd", padding: "0.5rem" }}
                          >
                            {column === "League" ? (
                              row["sport"]
                            ) : column === "Time" ? (
                              row["time"]
                            ) : column === "Event/Market" ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                {`${row["homeTeam"]} @`}
                                <br />
                                {`${row["awayTeam"]}`}
                                {row["market"] && (
                                  <span style={{ fontWeight: "bold" }}>
                                    {row["market"]}
                                  </span>
                                )}
                              </div>
                            ) : column === "Bet 1" ? (
                              row["bookmaker"]
                            ) : column === "Selection 1" ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                {row["selection1"]}
                                <br />
                                <span style={{ fontWeight: "bold" }}>
                                  {Math.round(row["odd1"])}
                                </span>
                              </div>
                            ) : column === "Bet 2" ? (
                              "Prophet Exchange"
                            ) : column === "Selection 2" ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                {row["selection2"]}
                                <br />
                                <span style={{ fontWeight: "bold" }}>
                                  {Math.round(row["odd2"])}
                                </span>
                              </div>
                            ) : column === "Rating" ? (
                              ""
                            ) : column === "Free Bet Rating" ? (
                              ""
                            ) : (
                              ""
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "100vh", // Use minHeight instead of height
                      position: "fixed", // Optionally, use position: fixed to ensure it overlays other content
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional overlay background color
                    }}
                  >
                    <GridLoader
                      color="#f21285"
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[rowsPerPage]}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
