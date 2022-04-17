import { useEffect, useState } from "react";
import axios from "axios";
import url from "./components/helper/spotify";
import Song from "./components/Song";
import {
    BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function App() {
    const [token, setToken] = useState("");
    const [searchSong, setSearchSong] = useState("");
    const [songData, setSongData] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [, setCombineSongs] = useState([]);

    // get the token from thr url
    useEffect(() => {
        const queryString = new URL(window.location.href.replace("#", "?"))
        .searchParams;
        const accessToken = queryString.get("access_token");
        setToken(accessToken);
    }, []);

    // basically pass songData to combineSongs and add isSelected to combineSongs
  useEffect(() => {
    const handleCombineTracks = songData.map((song) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineTracks);
  }, [songData, selectedSongs]);

  // a function to get song data from spotify
    const getSong = async () => {
        await axios
        .get(
            `https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${token}`
        )
        .then((response) => {
            setSongData(response.data.tracks.items);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleSelectBtn = (id) => {
      const indexSelectedSong = selectedSongs.indexOf(id);
      const newSelectedSong = [...selectedSongs];
      (indexSelectedSong < 0) ? newSelectedSong.push(id) : newSelectedSong.splice(indexSelectedSong, 1);
      setSelectedSongs(newSelectedSong);
  };

    return (
        <div className="p-5 bg-gray-900 h-screen space-y-5 overflow-auto">
            <div className="text-center">
                <h2 className="text-white text-3xl mb-5 font-semibold">
                Create Playlist
                </h2>
                <a
                href={url}
                className="py-2 px-4 bg-blue-600 rounded text-white font-medium uppercase hover:bg-blue-700 text-xs leading-tight"
                >
                Login
                </a>
            </div>
            <div>
                <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchSong(e.target.value)}
                />
                <button
                className="px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-blue-700"
                type="button"
                onClick={getSong}
                >
                Search
                </button>
            </div>  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {songData.map((song) => {
                const { id, name, artists, album, uri} = song;
                const isSelected = selectedSongs.includes(id);
                return (
                    <div key={id}>
                        <Song
                        key={uri}
                        uri={uri}
                        image={album.images[0]?.url}
                        title={name}
                        album={artists[0]?.name}
                        selectState={handleSelectBtn}
              isSelected={isSelected}
                        />
                        <button className="inline-block px-6 py-2.5 mr-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg" onClick={() => handleSelectBtn(song.id)}>
                            {isSelected ? "Deselect" : "Select"}
                        </button>
                    </div>
                );

                })}
            </div>
        </div>
    );
}

export default App;