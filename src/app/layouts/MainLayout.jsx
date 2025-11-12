import Footer from "./footer";
import Header from "./Header";
import RootLayout from "../layout";

const MainLayout = ({ children }) => {
  return (
    <RootLayout>
      <Header />
      <main>{children}</main>
      <Footer />
    </RootLayout>
  );
};

export default MainLayout;
