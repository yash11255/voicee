

// import React, { useEffect, useState } from "react";
// import "./Banner.css";

// const Banner = () => {
//     const [movie, setMovie] = useState(null);

//     useEffect(() => {
//         fetch("/data/movies.json")  // Fetch local JSON file
//             .then((response) => response.json())
//             .then((data) => {
//                 const x = Math.floor(Math.random() * data.results.length);
//                 setMovie(data.results[x]); // Pick a random movie
//             })
//             .catch((error) => console.error("Error loading JSON:", error));
//     }, []);

//     return (
//         <div
//             style={{ backgroundImage: `url(${movie ? movie.backdrop_path : ""})` }}
//             className="banner"
//         >
//             <div className="fade_content">
//                 <div className="content">
//                     <h1 className="title">{movie ? movie.title || movie.name : "No Title"}</h1>
//                     <div className="banner_buttons">
//                         <button className="button"><i className="fa fa-play"></i>Play</button>
//                         <button className="button"><i className="fa fa-bars"></i>My List</button>
//                     </div>
//                     <h1 className="description">{movie ? movie.overview : "No Description"}</h1>
//                 </div>
//             </div>
//             <div className="fade-bottom"></div>
//         </div>
//     );
// };

// export default Banner;

import React, { useEffect, useState } from "react";
import "./Banner.css";

const Banner = () => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch("/data/movies.json?nocache=" + new Date().getTime()) // Prevent cache issues
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (!data || !data.results || data.results.length === 0) {
                    throw new Error("JSON data is empty or incorrect.");
                }
                const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
                setMovie(randomMovie);
            })
            .catch((error) => console.error("Error loading JSON:", error));
    }, []);

    return (
        <div
            style={{ backgroundImage: `url(${movie ? movie.backdrop_path : ""})` }}
            className="banner"
        >
            <div className="fade_content">
                <div className="content">
                    <h1 className="title">{movie ? movie.title || movie.name : "No Title"}</h1>
                    <div className="banner_buttons">
                        <button className="button"><i className="fa fa-play"></i>Play</button>
                        <button className="button"><i className="fa fa-bars"></i>My List</button>
                    </div>
                    <h1 className="description">{movie ? movie.overview : "No Description"}</h1>
                </div>
            </div>
            <div className="fade-bottom"></div>
        </div>
    );
};

export default Banner;