import Home from "./components/Home/Home";
import Archive from "./components/Archive/Archive";
import Graph from "./components/Graph/Graph"
import { Route, Routes as ReactRoutes } from 'react-router-dom'

export default function Routes() {
    return (
        <ReactRoutes>
            <Route path="/" exact element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/graph" element={<Graph />} />
        </ReactRoutes>
    );
}