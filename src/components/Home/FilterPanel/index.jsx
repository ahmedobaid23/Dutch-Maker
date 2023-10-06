import React, { useState } from "react";
import Dropdown from "../../common/Dropdown";
import SingleSelectDropdown from "../../common/SingleSelectDropdown";
import InputField from "../../common/InputField";
// import SliderProton from "../../common/SliderProton";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material-next/Button";
import "./styles.css";

const gridTemplate = `
  "a b"
  "c d"
  "e f"
`;

const sports = [
  { id: 1, bet1: "baseball_mlb", bet2: 109, label: "MLB - Baseball" },
  { id: 2, bet1: "americanfootball_nfl", bet2: 31, label: "NFL - Football" },
  {
    id: 3,
    bet1: "americanfootball_ncaaf",
    bet2: 28370,
    label: "NCAAF - Football",
  },
  { id: 4, bet1: "basketball_ncaab", bet2: 15, label: "NCAAB - Basketball" },
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

const FilterPanel = ({ sliderValue, changeValue }) => {
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

  const allSports = sports.map((sport) => sport.label);
  const allMarkets = markets.map((market) => market.label);
  var isAllSelected;

  const handleClick = (event) => {
    console.log("hello");
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

  console.log(state);

  return (
    <div className="filterPanel">
      <div className="top">
        <div className="icon">
          <TuneIcon sx={{ color: "#f21285", height: "45px", width: "45px" }} />
          <p>FILTER</p>
        </div>
        <div className="refresh-button">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f21285",
              width: "22rem",
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

      {/* <div className="slider">
        <SliderProton />
      </div> */}
    </div>
  );
};

export default FilterPanel;
