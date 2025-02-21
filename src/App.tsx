import "./App.css";
import { Button } from "./components/ui/button";

function App() {
    //this is how we will use env vars in Vite
    const appTitle = import.meta.env.VITE_APP_TITLE || "Default Title";

    const clicked = () => {
        alert(`Welcome to ${appTitle}`);
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
