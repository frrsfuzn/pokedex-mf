import React from "react";
import Main from "./Main";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function DetailPokemonPage({ mode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Main mode={mode} />
      <ToastContainer bodyClassName={() => "text-xl flex items-center"} />
    </QueryClientProvider>
  );
}

export default DetailPokemonPage;
