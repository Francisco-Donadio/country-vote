import { useState, useEffect } from "react";
import type { CountryVote } from "../types";
import { api } from "../api/service";
import { SearchIcon } from "./Icons";

interface CountryTableProps {
  refreshTrigger?: number;
}

export const CountryTable = ({ refreshTrigger = 0 }: CountryTableProps) => {
  const [countries, setCountries] = useState<CountryVote[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTopCountries();
  }, [refreshTrigger]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery.trim()) {
        searchCountries();
      } else {
        loadTopCountries();
      }
    }, 300);

    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const loadTopCountries = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await api.getTopCountries();
      setCountries(data);
    } catch (error) {
      setError("Failed to load countries");
      console.error("Failed to load top countries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchCountries = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await api.searchCountries(searchQuery);
      setCountries(data);
    } catch (error) {
      setError("Failed to search countries");
      console.error("Failed to search countries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Top 10 Most Voted Countries
        </h2>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search Country, Capital City, Region or Subregion"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      )}

      {/* Error State */}
      {error && (
        <div className="mx-6 my-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Country
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Capital City
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Region
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Sub Region
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Votes
                </th>
              </tr>
            </thead>
            <tbody>
              {countries.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No countries found
                  </td>
                </tr>
              ) : (
                countries.map((country) => (
                  <tr
                    key={country.country}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {country.country}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {country.capital}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {country.region}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {country.subRegion}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {country.votes.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
