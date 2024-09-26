import { render } from "react-dom";
import Homepage from "./Tutor";
import LOGIN from "./login";
import Map from "./map"
import TutorLogin from "./tutorportal"
import Tutordashboard from "./tutordashboard"
import Giveid from  "./teacherprofile";
import {BrowserRouter,Routes,Route} from "react-router-dom";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LOGIN />} />
            <Route path="/teacher/:id" element={<Giveid />} />
            <Route path="/Mappage" element={<Map />} />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/Tutorportal" element={<TutorLogin />} />
            <Route path="/tutordashboard" element={<Tutordashboard />} />
        </Routes>
    </BrowserRouter>
    , rootElement);



    // login page or register page
    // user has to select some location where he wants to use our services
