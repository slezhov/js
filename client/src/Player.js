// import React, { useState, useEffect } from "react";

// const useAudio = file => {
//   const [audio] = useState(new Audio('c4380d74-639f-4af1-97d2-9482155d7147tag.mp3'));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//     [playing]
//   );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };

// const Player = ({ file }) => {
//   const [playing, toggle] = useAudio('c4380d74-639f-4af1-97d2-9482155d7147tag.mp3');

//   return (
//     <div>
//       <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
//     </div>
//   );
// };

// export default Player;