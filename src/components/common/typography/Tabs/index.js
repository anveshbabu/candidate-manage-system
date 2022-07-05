
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';


export const Normaltabs = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    let {
        type = 'text',
        className = '',
        placeholder = 'Enter',
        label = '',
        errorMessage = '',
        materialUi = true,
        onChange,
        data = []
    } = props;

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const handleChange = (event, newValue) => {
        setActiveIndex(newValue);
        onChange(newValue)
      };
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider',marginBottom:'10px' }}>
        <Tabs value={activeIndex} onChange={handleChange} aria-label="basic tabs example">
            {data.map((iteam, i) => <Tab label={iteam} {...a11yProps(i)} />)}

        </Tabs>
        </Box>
    )
}

