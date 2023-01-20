//if no prior search result, center search bar
//if there are present search results, move to top of main component
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LandlordCard from "./LandlordCard.jsx";
import AddLandlord from "./AddLandlord.jsx";
import Container from "./Container.jsx";

const SearchPage = () => {
  const [landlords, setLandlords] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [landlordsToRender, setLandlordsToRender] = useState([]);

  useEffect(() => {
    fetch("/api/getall")
      .then((res) => res.json())
      .then((json) => setLandlords(json));
  }, []);

  useEffect(() => {
    setLandlordsToRender(
      landlords.filter(
        (landlord) =>
          landlord.name.toLowerCase().includes(searchBar.toLowerCase()) ||
          landlord.location.toLowerCase().includes(searchBar.toLowerCase())
      )
    );
  }, [searchBar, landlords]);

  console.log("render", landlordsToRender);
  console.log("search", searchBar);

  /* NEED TO HANDLE IF THERE ARE NO LANDLORDS WITH THAT NAME OR CITY AND ALSO EMPTY SEARCH BAR*/

  return (
    <section>
      <Container>
        <div className="flex items-center justify-center relative p-10 space-x-10  ">
          <div className="text-gray-800">Search</div>
          <input
            type="text"
            onChange={(e) => setSearchBar(e.target.value)}
            value={searchBar}
            className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle focus:border-dark-purple w-full text-lg outline-none p-1 dark:text-white peer transition"
          />
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 p-5">
          {landlordsToRender.map((landlord) => (
            <LandlordCard key={landlord.id} landlord={landlord} />
          ))}
        </div>
        {/* <AddLandlord /> */}
        <div className="flex flex-col items-center ">
          <Link to="/addlandlord" className="text-gray-800 text-lg   ">
            <button
              type="button"
              className="w-full rounded bg-secondary p-3 px-6 text-gray-600 hover:text-dark-purple"
            >
              Add New Landlord
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default SearchPage;
