import React from "react";

import "./header.css";

import {
  faBed,
  faCalendar,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DateRange } from "react-date-range";
import { useState } from "react";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { format } from "date-fns"; //for the date format string
import { useNavigate } from "react-router-dom";

const Header = ({type}) => {
  // useState for updating the searchlist

  const [destination,setDestination] = useState("");
  
  //use state for the hiding the calender

  const [openDate, setOpenDate] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  //for tthe incremet and decrement of of option counter button

  const handleOption = (name,operation) => {
    setOptions(prev=>{return{
      ...prev,[name]: operation === 'i' ? options[name] +1 : options[name]-1, 
    }});
  };

  const navigate = useNavigate();

  const hanldeSearch = ()=>{
    navigate("/hotels",{state :{destination,date,options}})
  }

  // use state for the react date range element
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <div className="header">
      <div className={type == "list" ? "headerContainer listMode" : "headerContainer" }>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxi</span>
          </div>
        </div>
        {type!== 'list' && <>
        <h1 className="headerTitle">A lifetime of Discounts? It's Genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels- unlock intant savings of 10% or more
          with a free Booking.com account
        </p>
        <button className="headerBtn">Sign in / Register</button>

        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              className="headerSearchInput"
              placeholder="Where are you going?"
              onChange={e=>setDestination(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
              />
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult  ${options.children} children  ${options.room} room`}</span>
            {openOptions && <div className="options">
              <div className="optionItem">
                  <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult","d")}>-</button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button className="optionCounterButton"onClick={()=>handleOption("adult","i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                  <span className="optionText">children</span>
                <div className="optionCounter">
                  <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children","d")}>-</button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                  <span className="optionText">room</span>
                <div className="optionCounter">
                  <button disabled={options.room <= 1}className="optionCounterButton" onClick={()=>handleOption("room","d")} >-</button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                </div>
              </div>
            </div>}
          </div>
          <div  onClick={hanldeSearch} className="headerSearchItem">
            <button className="headerBtn">Search</button>
          </div>
        </div>
        </>
        }
      </div>
    </div>
  );
};

export default Header;
