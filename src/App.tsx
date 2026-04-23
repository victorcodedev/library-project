import AppRoutes from "./routes";
import { LoansProvider } from "./features/loans/LoansContext";
import { WishlistProvider } from "./features/wishlist/WishlistContext";
import { AuthProvider } from "./features/auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <LoansProvider>
        <WishlistProvider>
          <AppRoutes />
        </WishlistProvider>
      </LoansProvider>
    </AuthProvider>
  );
}

export default App;