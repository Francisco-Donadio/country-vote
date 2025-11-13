export interface Country {
  name: string;
  code: string;
}

export interface CountryVote {
  country: string;
  capital: string;
  region: string;
  subRegion: string;
  votes: number;
  rank: number;
}

export interface VoteSubmission {
  name: string;
  email: string;
  country: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
