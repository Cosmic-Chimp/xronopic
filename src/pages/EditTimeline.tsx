import { useParams } from "react-router-dom";

function EditTimeline() {
    const { id } = useParams();
    // fetch timeline data by id, populate form
    // onSubmit -> update timeline in DB
    return (
        <div>
            <h2>Editing Timeline: {id}</h2>
            <form>
                {/* fields pre-filled with timeline data */}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditTimeline;
