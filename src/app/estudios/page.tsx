"use client";
import Estudios from '../components/typography/Estudios';
import { ThemeProvider } from "flowbite-react";
import { customTheme } from "../theme";

export default function EstudiosPage() {
  return (
    <div className="light">
      <ThemeProvider theme={customTheme}>
        <Estudios />
      </ThemeProvider>
    </div>
  );
}