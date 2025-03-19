import { Link } from "react-router-dom";
import { Edit2 } from "lucide-react";

interface TimelineEvent {
    eventTitle: string;
    eventDescription: string;
    eventDate: string; // TODO: sort out exact type of eventDate
    imgUrl?: string;
}

interface TimelineCardProps {
    id: number;
    timelineTitle: string;
    timelineDescription: string;
    events: TimelineEvent[];
}

export function TimelineCard({
    id,
    timelineTitle,
    timelineDescription,
    events,
}: TimelineCardProps) {
    const eventsCount = events.length;

    return (
        <div className="flex flex-col rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            {/*  image area */}
            <div className="mb-4 h-32 w-full rounded-md bg-gray-100" />

            {/* Title + Edit icon */}
            <div className="mb-2 flex items-start justify-between">
                <h3 className="text-lg font-semibold">{timelineTitle}</h3>
                <Link
                    to={`/timelines/${id}/edit`}
                    className="text-gray-500 hover:text-gray-700"
                    title="Edit Timeline"
                >
                    <Edit2 className="h-5 w-5" />
                </Link>
            </div>

            {/* Description */}
            <p className="mb-4 text-sm text-gray-600">{timelineDescription}</p>

            {/* bottom of card*/}
            <div className="mt-auto flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    {eventsCount} events
                </span>
                <Link to={`/timelines/${id}`}>
                    <button className="rounded-md bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-900  focus:outline-none focus:ring-2 focus:ring-green-500">
                        View
                    </button>
                </Link>
            </div>
        </div>
    );
}
