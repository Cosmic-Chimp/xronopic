import "./App.css";
import { Button } from "./components/ui/button";

function App() {
    const clicked = () => {
        alert("'clicked'");
    };
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h1 className="text-5xl font-bold text-blue-300">
                    <Button onClick={clicked}>Hallo, World!</Button>
                </h1>
            </div>
        </>
    );
}

export default App;
