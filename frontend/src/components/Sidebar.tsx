import "./Sidebar.css";
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import logo from "../../public/assets/VM_VibrantMFilled09_Syellow_Sblue.svg";
import demo_video from "../../public/assets/CodeImpact.mp4";

export default function Sidebar(props: {
  models: Array<{ name: string; displayName: string }>;
  selectedModel: string;
  onSelectModel: any;
}) {
  let [demoDialogOpen, setDemoDialogOpen] = useState(false);
  let [disclaimerDialogOpen, setDisclaimerDialogOpen] = useState(true);

  return (
    <>
      <Dialog
        open={demoDialogOpen}
        onClose={() => setDemoDialogOpen(false) }
        maxWidth={false}
      >
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl fullWidth>
            <ReactPlayer
              url={demo_video}
              controls={true}
              width="90vw"
              height="min(50vw, 85vh)"
              playing
            />
          </FormControl>
        </DialogContent>
        <IconButton
          aria-label="close"
          onClick={ () => setDemoDialogOpen(false) }
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#ccc',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>

      <div className="sidebar">
        <div className="sidebarUpper">
          <div className="logo">
            <div className="wrapper">
              <div className="header">
                <img src={ logo } />
              </div>
              <div className="header">
                <p className="headline">Code</p>
                <p className="headline">Impact</p>
              </div>
            </div>
            <div className='github'>
                Built with ❤️ by the AI & Quantum Lab
            </div>
            <div className='github'>
                using&nbsp;<a href='https://github.com/ricklamers/gpt-code-ui'>GPT-Code UI - v{import.meta.env.VITE_APP_VERSION}</a>
            </div>
          </div>
          <div className="documentation">
            <label className="header">Documentation</label>
            <Button onClick={() => { setDemoDialogOpen(true); }}>Demo Video</Button>
          </div>
        </div>
        <div className="sidebarMiddle">
        </div>
        <div className="sidebarLower">
          <div className="settings">
            <label className="header">Settings</label>
            <FormControl fullWidth>
              <InputLabel id="model-select-label">Model</InputLabel>
              <Select
              labelId="model-select-label"
              id="simple-select"
              value={props.selectedModel}
              label="Model"
              onChange={(event: SelectChangeEvent) => props.onSelectModel(event.target.value as string)}
              >
              {props.models.map((model, index) => {
                  return (
                  <MenuItem key={index} value={model.name}>
                      {model.displayName}
                  </MenuItem>
                  );
              })}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
}
