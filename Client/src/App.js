import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/Website/Footer'
import Header from './Components/Website/Header'
import ContactUs from './Components/Website/ContactUs'
import SignIn from './Components/Users/SignIn'
import SignUp from './Components/Users/SignUp'
import Donations from './Components/Website/Donations'
import DonationsDetails from './Components/Website/DonationsDetails';
import AboutUs from './Components/Website/AboutUs';
import Idea from './Components/Website/Idea';
import Profile from './Components/Website/Profile';
import Admin from './Components/Website/Admin';
import Home from './Components/Website/Home';
import OurServices from './Components/Website/OurServices';
import NotFound from './Components/Website/NotFound';


export const ProductsData = createContext();

function App() {

  const [isLog, setIsLog] = useState(localStorage.getItem("token") ? true : false);

  return (
    <BrowserRouter>
      <Header isLog={isLog} updateIsLog={setIsLog} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signIn" element={<SignIn updateIsLog={setIsLog} />} />
        <Route path="/signUp" element={<SignUp updateIsLog={setIsLog} />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/donations" element={<Donations />} />
        <Route
          path="/donations_details/:donationId"
          element={<DonationsDetails />}
        />{" "}
        <Route path="/idea" element={<Idea />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/our_services" element={<OurServices />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


