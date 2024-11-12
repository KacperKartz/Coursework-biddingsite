import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoginFAQ from '../assets/LoginFAQ.png'
import LoginFAQ2 from '../assets/LoginFAQ2.png'
import RegisterFAQ1 from '../assets/RegisterFAQ1.png'
import RegisterFAQ2 from '../assets/RegisterFAQ2.png'
import BiddingFAQ from '../assets/BiddingFAQ.png'
import BiddingFAQ2 from '../assets/BiddingFAQ2.png'
import BiddingFAQ3 from '../assets/BiddingFAQ3.png'

const FAQPage = () =>{
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="FAQ-page-wrapper">
        <h2>Frequently asked questions</h2>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                How do I log in?
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}></Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                <ol>
                    <li>
                        Start by navigating to the login button in the navigation bar at 
                        the top of your screen and click on 'Login'.
                        <br /><br />
                        <img src={LoginFAQ} rel="login faq" />
                    </li>
                    <li>
                        Enter your login details and click submit!
                        <br /><br />
                        <img src={LoginFAQ2} rel="login faq" />
                    </li>
                    <li>
                        Thats it you've successfully logged in! welcome to AUCTO.
                    </li>
                </ol>
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                How do I register an account with AUCTO?
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                <ol>
                    <li>
                        Start by navigating to the login button in the navigation bar at 
                        the top of your screen and click on 'Login'.
                        <br /><br />
                        <img src={LoginFAQ} rel="register faq" />
                    </li>
                    <li>
                        Click on the 'Register here' button.
                        <br /><br />
                        <img src={RegisterFAQ1} rel="register faq" />
                    </li>
                    <li>
                        Next, enter your personal information and finally click submit.
                        <br /><br />
                        <img src={RegisterFAQ2} rel="register faq" />
                    </li>
                    <li>
                        Thats it you've registered! welcome to AUCTO.
                    </li>
                </ol>
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel2bh-header"
            >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                How do I bid on an item?
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                <ol>
                    <li>
                        To begin make sure you are logged into your AUCTO account.
                    </li>
                    <li>
                        Now you need to click on the Shop in the navigation bar at the top
                        of your screen.
                        <br /><br />
                        <img src={BiddingFAQ} rel=""/>
                    </li>
                    <li>
                        Next click on an item you want to make a bid for.
                        <br /><br />
                        <img src={BiddingFAQ2} rel=""/>
                    </li>
                    <li>
                        Now that you're on the product page you can enter your bid amount and click 'Place Bid'.
                        <br /><br />
                        <img src={BiddingFAQ3} rel=""/>
                    </li>
                    <li>
                        Thats it! Good luck.
                    </li>
                </ol>
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel3bh-header"
            >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                How do I sell an item?
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel4bh-header"
            >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                How do I watch an Item?
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel5bh-header"
            >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                How do I leave a review on an item?
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
            >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                How do I search for a specific item?
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
            </AccordionDetails>
        </Accordion>
    </div>
  );
}
export default FAQPage;