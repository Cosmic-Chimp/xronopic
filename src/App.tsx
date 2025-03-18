import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// @ts-ignore
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Example: If you store Navbar here
import { Navbar } from "./components/xronopic/ui/Navbar";

// Pages (you’ll need to create these)
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import TimelinesList from "./pages/TimelinesList";
import CreateTimeline from "./pages/CreateTimeline";
import ViewTimeline from "./pages/ViewTimeline";
import EditTimeline from "./pages/EditTimeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <BrowserRouter> */}
            <Navbar />
            <Routes>
                {/* Public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />

                {/* Timelines (only show if user is logged in, or handle that inside each page) */}
                <Route path="/timelines" element={<TimelinesList />} />
                <Route path="/timelines/new" element={<CreateTimeline />} />
                <Route path="/timelines/:id" element={<ViewTimeline />} />
                <Route path="/timelines/:id/edit" element={<EditTimeline />} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* </BrowserRouter> */}
        </QueryClientProvider>
    );
}

export default App;
