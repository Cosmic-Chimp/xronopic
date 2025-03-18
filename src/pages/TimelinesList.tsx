import { Link, Navigate } from "react-router-dom";

function TimelinesList() {
    const isLoggedIn = true; // TODO: get from context/store currently hardcoded everytwher
    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }
    // fetch user timelines, etc.
    return (
        <div>
            <h2>My Timelines</h2>
            <Link to="/timelines/new">
                <button>+ Add New Timeline</button>
            </Link>

            {/* Map over user's timelines, link each to /timelines/:id or /timelines/:id/edit */}
            {/* Example: */}
            {/* timelines.map(t => (
        <div key={t.id}>
          <Link to={`/timelines/${t.id}`}>{t.title}</Link>
          <Link to={`/timelines/${t.id}/edit`}>Edit</Link>
        </div>
      )) */}
        </div>
    );
}

export default TimelinesList;
