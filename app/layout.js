import "./globals.css";
import ThirdwebProvider from "./thirdweb-provider"; // Import the provider

export const metadata = {
  title: "nexachain",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
