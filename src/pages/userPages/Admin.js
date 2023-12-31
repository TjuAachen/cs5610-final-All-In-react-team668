import React, { useEffect } from "react";
// import AdminNav from "../components/AdminComponents/AdminNav";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import AdminDashboard from "../components/AdminComponents/AdminDashBoard";
import AdminUsers from "../../components/AdminComponents/AdminUsers";
// import AdminPlaylists from "../components/AdminComponents/AdminPlaylists";
import { findCurrentUserThunk } from "../../services/users/users-thunks";
// import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";

const Admin = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findCurrentUserThunk());
        // dispatch(findCurrentUserSongsThunk());
    }, []);


  return (
    <div>
    <AdminUsers />
      {/* <AdminNav /> */}
      <Routes>
        {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/users" element={<AdminUsers />} /> */}
        {/* <Route path="/playlists" element={<AdminPlaylists />} /> */}
      </Routes>
    </div>
  );
};

export default Admin;