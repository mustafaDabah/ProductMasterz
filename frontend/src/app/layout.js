import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/page.css";
import { AuthProvider } from "@/Components/UI";


export default function RootLayout({ children }) {

  return (
    <AuthProvider>
      <html lang="en">
        <head>
        </head>
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
