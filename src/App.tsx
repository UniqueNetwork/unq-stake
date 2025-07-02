import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";;
import StakingPageClient from "@/components/StakingPageClient";
import { WalletProvider } from "@/context/wallet-context";

export default function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <div id="portal-root"></div>
        <StakingPageClient />
      </WalletProvider>
    </ThemeProvider>
  );
}
