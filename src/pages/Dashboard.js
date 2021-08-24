import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProfileSummary from "../components/ProfileSummary";
import UpcomingEvents from "../components/UpcomingEvents";
import Portfolio from "../components/Portfolio";
import Stats from "../components/Stats";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { request } from "../util";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
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
    },
    container: {
        marginTop: "30px"
    },
}));

export default function Dashboard({ setPage, setToken }) {
    const classes = useStyles();
    const [events, setEvents] = useState({});

    const updateEvents = async () => {
        let response = await request({
            type: "GET",
            path: "events/"
        })
        setEvents(response);
        console.log(response);
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

    return (
        <div align="center" className={classes.root}>
            <Header />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
                className={classes.container}>
                <Grid item xs={5}>
                    <div className={classes.box}>
                        <ProfileSummary />
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className={classes.box}>
                        <Stats />
                    </div>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={10}>
                    <div className={classes.box}>
                        <Portfolio events={events} updateEvents={updateEvents} />
                    </div>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={10}>
                    <div className={classes.box}>
                        <UpcomingEvents events={events} />
                    </div>
                </Grid>
                <Grid item xs={12}></Grid>
            </Grid>
            <br /><br /><br />
        </div>
    )
}