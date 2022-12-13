import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";

const queryState = atom({
  key: "query",
  default: "",
});

const resultsState = selector({
  key: "searchResults",
  get: async ({ get }) => {
    const valorDeQuery = get(queryState);

    if (valorDeQuery) {
      const res = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${valorDeQuery}`
      );
      const data = await res.json();
      return data.results;
    } else {
      return [];
    }
  },
});

export function useSearchResults() {
  const params = useParams();
  const query = params.query;
  const [value, setQueryValue] = useRecoilState(queryState);
  const results = useRecoilValue(resultsState);

  useEffect(() => {
    if (query) {
      setQueryValue(query);
    }
  }, [query]);

  return results;
}
