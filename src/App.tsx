import {Route, Routes} from "react-router-dom";
import Jobs from "./Page/Jobs.tsx";
import SingleJob from "./Page/SingleJob.tsx";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Jobs />} />
      <Route path="/single-job" element={<SingleJob />} />
    </Routes>


    </>
  )
}

export default App
