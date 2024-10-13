import React from "react";
import Main from "./Main";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function DetailPokemonPage({ mode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Main mode={mode} />
    </QueryClientProvider>
  );
}

export default DetailPokemonPage;
