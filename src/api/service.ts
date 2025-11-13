import type {
  Country,
  CountryVote,
  VoteSubmission,
  ApiResponse,
} from "../types";

// Update this with your NestJS backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = {
  // Get all countries for the dropdown
  async getCountries(): Promise<Country[]> {
    const response = await fetch(`${API_BASE_URL}/countries`);
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const data: ApiResponse<Country[]> = await response.json();
    return data.data;
  },

  // Get top 10 countries by votes
  async getTopCountries(): Promise<CountryVote[]> {
    const response = await fetch(`${API_BASE_URL}/votes/top`);
    if (!response.ok) {
      throw new Error("Failed to fetch top countries");
    }
    const data: ApiResponse<CountryVote[]> = await response.json();
    return data.data;
  },

  // Submit a vote
  async submitVote(vote: VoteSubmission): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vote),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit vote");
    }
  },

  // Search countries by name
  async searchCountries(query: string): Promise<CountryVote[]> {
    const response = await fetch(
      `${API_BASE_URL}/votes/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Failed to search countries");
    }
    const data: ApiResponse<CountryVote[]> = await response.json();
    return data.data;
  },
};
