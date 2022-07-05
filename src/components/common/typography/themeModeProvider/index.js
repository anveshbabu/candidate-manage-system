import React, { useContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { EXIST_LOCAL_STORAGE } from '../../../../services/constants'

export const ThemeMode = React.createContext({});

export class ThemeModeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            darkTheme: createTheme({
                palette: {
                    mode: 'light',
                },
            })
        };
    }


    componentDidMount() {
        let THEME_MODE = localStorage.getItem(EXIST_LOCAL_STORAGE.THEME_MODE);
        if (!!THEME_MODE) {
            this.setDarkThemeMode()
        }else{
            this.handleThemeMode(window.matchMedia('(prefers-color-scheme: dark)')?.matches)
        }
     
    }
    setDarkThemeMode = () => {
        let darkTheme = '';
        let THEME_MODE = localStorage.getItem(EXIST_LOCAL_STORAGE.THEME_MODE);

        if (THEME_MODE === 'dark') {
            document.getElementsByTagName("body")[0].setAttribute("data-theme", "dark");
            darkTheme = createTheme({
                palette: {
                    mode: 'dark',
                },
            });
        } else {
            document.getElementsByTagName("body")[0].setAttribute("data-theme", "light");
            darkTheme = createTheme({
                palette: {
                    mode: 'light',
                },
            });
        }
        this.setState({darkTheme})

    };

    handleThemeMode = (checked) => {
        localStorage.setItem(EXIST_LOCAL_STORAGE.THEME_MODE, checked ? 'dark' : 'light');
        this.setDarkThemeMode()
    }



    render() {
        let { children } = this.props;
        let {darkTheme}=this.state;
        return (
            <ThemeMode.Provider value={{ modeChange: this.handleThemeMode }}>
                <ThemeProvider theme={darkTheme}>
                    {children}

                </ThemeProvider>
            </ThemeMode.Provider>

        );
    }


}



