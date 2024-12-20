import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";
import BottomTab from "../../more/BottomTab";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Thông tin vận chuyển</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Xác nhận đơn hàng</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Thanh toán</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#3BB77E" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <BottomTab />
    </>
  );
};

export default CheckoutSteps;