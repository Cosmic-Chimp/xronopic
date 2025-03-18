import { useParams } from "react-router-dom";

function ViewTimeline() {
    const { id } = useParams(); // timeline ID
    // fetch timeline data, display
    return (
        <div>
            <h2>View Timeline: {id}</h2>
        </div>
    );
}

export default ViewTimeline;
