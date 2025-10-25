import { ThemeProvider } from "flowbite-react";
import LoginForm from "@/app/components/typography/loginForm";
import { ThemeInit } from "../../.flowbite-react/init";
import { customTheme } from "./theme";

export default function App() {
  return (
    <div className="light">
      <ThemeProvider theme={customTheme}>
        <LoginForm />
      </ThemeProvider>
    </div>
  );
}
