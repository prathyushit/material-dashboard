import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography"; // Assuming MDTypography is Material-UI's Typography
import PropTypes from "prop-types";

const TooltipButton = ({ text, tooltipText }) => {
  return (
    <Tooltip title={tooltipText} arrow placement="top">
      <Typography
        variant="h6"
        fontWeight="bold"
        // sx={{
        //   padding: "8px 16px",
        //   borderRadius: "8px",
        //   backgroundColor: "#e0f7fa",
        //   border: "2px solid #80deea",
        //   cursor: "pointer",
        //   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        //   "&:hover": {
        //     backgroundColor: "#b2ebf2",
        //     // boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
        //   },
        // }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

// Define PropTypes for validation
TooltipButton.propTypes = {
  text: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
};

export default TooltipButton;
