import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, Navigate } from "react-router-dom";
import { TimelineCard } from "@/components/xronopic/ui/TimelineCard";

//TODO: create this interface please
// interface ITimeline {
//     id
//     timelineTitle

// }

function TimelinesList() {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token); // Get the token
    const [timelines, setTimelines] = useState([]);

    console.log("User:", user);

    useEffect(() => {
        if (user && user.id && token) {
            // Check for token
            // console.log(`Fetching timelines for user ID: ${user.id}`);
            fetch(`http://localhost:5127/api/timelines/me`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the header
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => setTimelines(data))
                .catch((error) =>
                    console.error("Error fetching timelines:", error)
                );
        } else {
            console.log("User object is undefined or missing ID or Token.");
        }
    }, [user, token]); // Add token to dependency array

    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            {/* top section */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Timelines</h2>
                <Link to="/timelines/new">
                    <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        + Create Timeline
                    </button>
                </Link>
            </div>
            {/* TODO: add a search bar here later so that users can search for their timelines, if they have many */}

            {/* Timeline card grid */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {timelines.map((timeline: any) => (
                    <TimelineCard
                        key={timeline.id}
                        id={timeline.id}
                        timelineTitle={timeline.timelineTitle}
                        timelineDescription={timeline.timelineDescription}
                        events={timeline.events}
                    />
                ))}
            </div>
        </div>
    );
}

export default TimelinesList;
