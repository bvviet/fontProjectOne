import "./profile.scss";
import { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import { UserContext } from "../../hooks/UserContextUser";

import ProfileLeft from "./ProfileLeft";
import { Outlet } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({});
    const { userData } = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    return (
        <Box
            sx={{
                px: {
                    xs: "16px", // padding cho kích thước rất nhỏ (extra-small)
                    sm: "20px", // padding cho kích thước nhỏ (small)
                    md: "30px", // padding cho kích thước trung bình (medium)
                    lg: "50px", // padding cho kích thước lớn (large)
                    xl: "50px", // padding cho kích thước rất lớn (extra-large)
                },
                backgroundColor: "var(--bg-main)",
                padding: "25px 0",
            }}
        >
            <Grid
                container
                rowSpacing={0}
                columnSpacing={{ sm: "" }}
                columns={{ xs: 6, md: 12, lg: 12 }}
                className="content-profile"
                sx={{ justifyContent: "space-between" }}
            >
                {/* Profile left */}

                <ProfileLeft user={user} />
                {/* Profile right */}
                <Grid item xs={6} sm={8} className="profile-right">
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
