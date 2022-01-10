import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProfileSummary from "../components/ProfileSummary";
import UpcomingEvents from "../components/UpcomingEvents";
import Portfolio from "../components/Portfolio";
import Stats from "../components/Stats";
import Profile from "../components/Profile";
import { Grid, makeStyles } from "@material-ui/core";
import { request } from "../util";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100vw",
        zIndex: 0,
        flexGrow: 1,
    },
    box: {
        backgroundColor: theme.palette.primary.main,
        paddingTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        borderRadius: "20px",
        height: "100%",
        paddingBottom: "20px"
    },
    container: {
        marginTop: "30px",
        paddingLeft: "20px",
        paddingRight: "20px"
    },
    grid: {
        marginBottom: "20px",
    }
}));

export default function Dashboard({ page, setPage }) {
    const classes = useStyles();
    const [events, setEvents] = useState({});
    const [log, setLog] = useState({});
    const [profile, setProfile] = useState({});
    const [profileImage, setProfileImage] = useState({});

    // User profile 
    const updateProfile = async () => {
        let response = await request({
            type: "GET",
            path: `profile/${localStorage.getItem("email")}` // change to any user
        })
        setProfile(response);
        console.log(response);
    };

    useEffect(() => {
        if (profile.first_name !== undefined) {
            const interval = setInterval(updateProfile, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateProfile();
        }
    })

    // User profile image
    const updateProfileImage = async () => {
        let response = await request({
            type: "GET",
            path: `profile-image/${localStorage.getItem("email")}` // change to any user
        })
        setProfile(response);
        console.log(response);
    };

    useEffect(() => {
        if (Object.keys(profile).length !== 0) {
            const interval = setInterval(updateProfileImage, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateProfileImage();
        }
    })


    // JANJ events
    const updateEvents = async () => {
        let response = await request({
            type: "GET",
            path: "events/"
        })
        setEvents(response);
    }

    useEffect(() => {
        if (Object.keys(events).length !== 0) {
            const interval = setInterval(updateEvents, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateEvents();
        }
    })

    // User volunteer and participation log 
    const updateLog = async () => {
        let response = await request({
            type: "GET",
            path: `log/${localStorage.getItem("email")}` // change to any user
        })
        setLog(response);
    };

    useEffect(() => {
        if (Object.keys(log).length !== 0 || log.length === 0) {
            const interval = setInterval(updateLog, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateLog();
        }
    });

    return (
        <div align="center" className={classes.root}>
            <Header setPage={setPage} />
            {page === "dashboard" ?
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                    className={classes.container}>
                    <Grid item xs={12} sm={12} md={6} lg={5} xl={5} className={classes.grid}>
                        <div className={classes.box}>
                            <ProfileSummary profile={profile} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5} xl={5} className={classes.grid}>
                        <div className={classes.box}>
                            <Stats log={log} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10} xl={10} className={classes.grid}>
                        <div className={classes.box}>
                            <Portfolio
                                events={Object.keys(events).length !== 0 ? events.filter(event => (event.active === true)) : events}
                                log={log}
                                updateLog={updateLog} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10} xl={10} className={classes.grid}>
                        <div className={classes.box}>
                            <UpcomingEvents events={Object.keys(events).length !== 0 ? events.filter(event => (event.upcoming === true)) : events} />
                        </div>
                    </Grid>
                </Grid>
                : <Profile profile={profile} updateProfile={updateProfile} profileImage={profileImage} updateProfileImage={updateProfileImage} />
            }
            <br /><br /><br />
        </div>
    )
}