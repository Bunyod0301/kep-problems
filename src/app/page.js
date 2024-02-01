import React from "react";
import DataGrid from "@/Components/DataTable";
import "./globals.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import { PrimeReactProvider } from "primereact/api";
import { SkeletonTheme } from "react-loading-skeleton";
export default function Home() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <PrimeReactProvider>
        <DataGrid />
      </PrimeReactProvider>
    </SkeletonTheme>
  );
}
