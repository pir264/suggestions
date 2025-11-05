export interface Suggestion {
  id: string;
  type: string;
  waarde: string;
}

export interface CreateSuggestionRequest {
  type: string;
  waarde: string;
}

export interface UpdateSuggestionRequest {
  type: string;
  waarde: string;
}
