import type {
  Country,
  CountryVote,
  VoteSubmission,
  ApiResponse,
} from "../types";
import { API } from "./API.config";

export const api = {
  // Get all countries for the dropdown
  async getCountries(): Promise<Country[]> {
    const response = await API.get<ApiResponse<Country[]>>("/countries");
    return response.data.data;
  },

  // Get top 10 countries by votes
  async getTopCountries(): Promise<CountryVote[]> {
    const response = await API.get<ApiResponse<CountryVote[]>>("/votes/top");
    return response.data.data;
  },

  // Submit a vote
  async submitVote(vote: VoteSubmission): Promise<void> {
    await API.post("/votes", vote);
  },

  // Search countries by name
  async searchCountries(query: string): Promise<CountryVote[]> {
    const response = await API.get<ApiResponse<CountryVote[]>>(
      "/votes/search",
      {
        params: { q: query },
      }
    );
    return response.data.data;
  },
};
