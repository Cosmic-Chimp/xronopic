import { Link, Navigate } from "react-router-dom";
import { TimelineCard } from "@/components/xronopic/ui/TimelineCard";

function TimelinesList() {
    const isLoggedIn = true; // TODO: get from context/store currently hardcoded everytwher
    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    // defining the strucutre of our data, this will obviously be fetched from our data source NOT hardcoded like this
    const timelines = [
        {
            id: 1,
            timelineTitle: "Road Trip",
            timelineDescription: "Cross-country adventure with friends",
            events: [
                {
                    eventTitle: "Starting Point",
                    eventDescription: "Leaving from our hometown",
                    eventDate: "2025-06-01",
                    imgUrl: "https://via.placeholder.com/150/1", // placeholder image
                },
                {
                    eventTitle: "First Stop",
                    eventDescription: "Visiting the Grand Canyon",
                    eventDate: "2025-06-03",
                    imgUrl: "https://via.placeholder.com/150/2",
                },
            ],
        },
        {
            id: 2,
            timelineTitle: "Project Plan",
            timelineDescription: "Milestones for our software project",
            events: [
                {
                    eventTitle: "Kickoff",
                    eventDescription: "Initial meeting with stakeholders",
                    eventDate: "2025-04-10",
                },
                {
                    eventTitle: "Design Phase",
                    eventDescription: "Create wireframes and mockups",
                    eventDate: "2025-04-15",
                },
                {
                    eventTitle: "Development Start",
                    eventDescription: "Implement core features",
                    eventDate: "2025-05-01",
                },
            ],
        },
        {
            id: 3,
            timelineTitle: "Personal Goals",
            timelineDescription: "Tracking my fitness and reading goals",
            events: [
                {
                    eventTitle: "Gym Membership",
                    eventDescription: "Signed up at local gym",
                    eventDate: "2025-01-02",
                },
                {
                    eventTitle: "Marathon Training",
                    eventDescription: "Begin 16-week marathon training plan",
                    eventDate: "2025-02-01",
                },
                {
                    eventTitle: "Reading Challenge",
                    eventDescription: "Aiming to read 20 books this year",
                    eventDate: "2025-01-10",
                },
            ],
        },
    ];

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
                {timelines.map((timeline) => (
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
