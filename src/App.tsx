import { useState } from "react";
import { VotingForm } from "./components/VotingForm";
import { CountryTable } from "./components/CountryTable";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleVoteSubmitted = () => {
    // Trigger a refresh of the country table
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <VotingForm onVoteSubmitted={handleVoteSubmitted} />

        <CountryTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default App;
