/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* prettier-ignore-file */

import { useEffect,useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import LinearGradient from "react-native-linear-gradient";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDTooltip from "components/MDTooltip";
import BucketSelector from "../BucketSelector";
import DataInfoList from "../DataList";
// prettier-ignore

import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

import { useStores } from "../../../../store";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

// Data
import data from "layouts/dashboard/components/Projects/data";
const commonStyles = {
  accordion: {
    // border: "1px solid #340CB9",
    borderRadius: "5px",
    marginBottom: "5px",
    color: "red"
  },
  accordionSummary: {
    height: "40px",
    minHeight: "40px",
  },
  mdBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  roundBox: {
    width: 25,
    height: 25,
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "1px solid grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function Converter() {
  const { dataStore } = useStores();
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState("");
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [selectedBucket, setSelectedBucket] = useState(
    dataStore.selectedBucket
  );


  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  useEffect(() => {
    dataStore.getBuckets();
  }, [dataStore]);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    // prettier-ignore

    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h5" gutterBottom>
            EDI-TO-FHIR CONVERTER
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            {/* <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon> */}
            {/* <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </MDTypography> */}
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox p={3}>
        {/* <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        /> */}
        

        <Accordion
         sx={{ backgroundColor: '#B0BEC5' }}
          backgroundColor={sidenavColor}
          style={{
                  ...commonStyles.accordion,
                  // border:
                  //   dataStore.step >= 0
                  //     ? "1px solid #340CB9"
                  //     : "1px solid #d8d8d8",
                  marginBottom: "20px",
                  backgroundColor:"#000000",
                  color:"#000000",
                  variant:"gradient",
                  backgroundColor:{sidenavColor}
                }}
                expanded={expandedAccordion === "accordion1"}
                onChange={() =>
                  setExpandedAccordion(
                    expandedAccordion === "accordion1" ? "" : "accordion1"
                  )
                }
              >
                

                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`1-content`}
                  id={`1-header`}
                  style={commonStyles.accordionSummary}
                >
                  <MDBox sx={{ ...commonStyles.mdBox, gap: `120px`,color: "#525f7f"}}>
                    <MDBox sx={{ ...commonStyles.mdBox, gap: "10px",color: "#525f7f" }}>
                      {/* Box is for the number  */}
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          borderRadius: "50%",
                          backgroundColor:
                            dataStore.selectedBucket === ""
                              ? "transparent"
                              : "#17A948",
                          border:
                            dataStore.selectedBucket === ""
                              ? "1px solid grey"
                              : "1px solid #17A948",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDTypography
                          variant="button"
                          fontWeight="light"
                          color={
                            dataStore.selectedBucket === "" ? "dark" : "white"
                          }
                        >
                          1
                        </MDTypography>
                      </Box>
                      {/* <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Select
                      </MDTypography> */}

                      {/* Insert code block for tooltip */}
                      <MDTooltip 
                        text= "Select" 
                        tooltipText="Specify S3 Bucket path to get started with validation and conversion stage" 
                      />

                    </MDBox>
                    {/* {matches && (
                      <MDTypography
                        // variant="button"
                        // fontWeight="light"
                        // color="dark"
                        variant="button"
                        fontWeight="bold"
                        color={dataStore.selectedBucket === "" ? "error" : "primary"}
                        sx={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          backgroundColor: dataStore.selectedBucket === "" ? "#f8d7da" : "#e0f7fa",
                          border: dataStore.selectedBucket === "" ? "2px solid #f5c6cb" : "2px solid #80deea",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            backgroundColor: dataStore.selectedBucket === "" ? "#f5c6cb" : "#b2ebf2",
                            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                          },
                        }}
                      >
                        {dataStore.selectedBucket === ""
                          ? "Specify S3 Bucket path to get started with validation and conversion stage"
                          : dataStore.selectedBucket}
                      </MDTypography>
                    )} */}
                  </MDBox>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <MDBox
                    sx={{
                      marginTop: "20px",
                    }}
                  >
                    <BucketSelector
                      dataStore={dataStore}
                      selectedBucket={selectedBucket}
                      setSelectedBucket={setSelectedBucket}
                    />
                  </MDBox>
                  <MDButton
                    variant="gradient"
                    color={sidenavColor}
                    sx={{
                      width: 100,
                      ml: 5,
                      mr: 5,
                      alignSelf: "flex-end",
                      borderRadius: 10,
                    }}
                    disabled={dataStore.selectedBucket === ""}
                    onClick={() => {
                      setExpandedAccordion("accordion2");
                      dataStore.changeStep(1);
                    }}
                  >
                    Save
                  </MDButton>
                </AccordionDetails>
              </Accordion>

              <Accordion
         sx={{ backgroundColor: '#B0BEC5' }}
         style={{
                  ...commonStyles.accordion,
                  border:
                    dataStore.step >= 1
                      ? "1px solid #340CB9"
                      : "1px solid #d8d8d8",
                  marginBottom: "20px",
                }}
                expanded={expandedAccordion === "accordion2"}
                onChange={() =>
                  setExpandedAccordion(
                    expandedAccordion === "accordion2" ? "" : "accordion2"
                  )
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`2-content`}
                  id={`2-header`}
                  style={commonStyles.accordionSummary}
                >
                  <MDBox sx={{ ...commonStyles.mdBox, gap: `98px` }}>
                    <MDBox sx={{ ...commonStyles.mdBox, gap: "10px" }}>
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          borderRadius: "50%",
                          backgroundColor: !dataStore.validated
                            ? "transparent"
                            : "#17A948",
                          border: !dataStore.validated
                            ? "1px solid grey"
                            : "1px solid #17A948",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDTypography
                          variant="button"
                          fontWeight="light"
                          color={!dataStore.validated ? "dark" : "white"}
                        >
                          2
                        </MDTypography>
                      </Box>
                      {/* <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Validation
                      </MDTypography> */}
                      <MDTooltip 
                        text= "Validate" 
                        tooltipText="Validate files present in selected S3 Bucket" 
                      />
                    </MDBox>

                    {/* {matches && (
                      <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Validate the files present in selected s3 bucket
                      </MDTypography>
                    )} */}
                  </MDBox>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <MDButton
                    variant="gradient"
                    color={sidenavColor}
                    sx={{
                      width: 100,
                      ml: 5,
                      mr: 5,
                      borderRadius: 10,
                    }}
                    onClick={() => {
                      dataStore.validateFiles();
                    }}
                    disabled={
                      dataStore.selectedBucket === "" || dataStore.step < 1
                    }
                  >
                    Validate
                  </MDButton>
                  {/* ///////////////////////////////////////////////////////////////////////////ENter whatto put */}

                  <DataInfoList
                    dataInfo={dataStore.validateStatusMsg}
                    loading={dataStore.isValidateLoading}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
         sx={{ backgroundColor: '#B0BEC5' }}
         style={{
                  ...commonStyles.accordion,
                  border:
                    dataStore.step >= 2
                      ? "1px solid #340CB9"
                      : "1px solid #d8d8d8",
                }}
                expanded={expandedAccordion === "accordion3"}
                onChange={() =>
                  setExpandedAccordion(
                    expandedAccordion === "accordion3" ? "" : "accordion3"
                  )
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`3-content`}
                  id={`3-header`}
                  style={commonStyles.accordionSummary}
                >
                  <MDBox sx={{ ...commonStyles.mdBox, gap: `89px` }}>
                    <MDBox sx={{ ...commonStyles.mdBox, gap: "10px" }}>
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          borderRadius: "50%",
                          backgroundColor: !dataStore.converted
                            ? "transparent"
                            : "#17A948",
                          border: !dataStore.converted
                            ? "1px solid grey"
                            : "1px solid #17A948",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDTypography
                          variant="button"
                          fontWeight="light"
                          color={!dataStore.converted ? "dark" : "white"}
                        >
                          3
                        </MDTypography>
                      </Box>
                      {/* <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Conversion
                      </MDTypography> */}
                      <MDTooltip 
                        text= "Convert" 
                        tooltipText="Convert validated files" 
                      />
                    </MDBox>

                    {/* {matches && (
                      <MDTypography
                        variant="button"
                        fontWeight="light"
                        color="dark"
                      >
                        Convert your validated files and download them
                      </MDTypography>
                    )} */}
                  </MDBox>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <MDButton
                    variant="gradient"
                    color={sidenavColor}
                    sx={{
                      width: 100,
                      ml: 5,
                      mr: 5,
                      borderRadius: 10,
                    }}
                    disabled={
                      dataStore.selectedBucket === "" || dataStore.step < 2
                    }
                    onClick={() => {
                      dataStore.transformFiles();
                    }}
                  >
                    Convert
                  </MDButton>
                {/* ///////////////////////////////////////////////////////////////////////////ENter whatto put */}
                  <DataInfoList
                    dataInfo={dataStore.convertStatusMsg}
                    loading={dataStore.isTransformLoading}
                  />
                  {dataStore.step >= 3 ? (
                    <MDButton
                      variant="gradient"
                      color="success"
                      sx={{
                        ml: 5,
                        mr: 5,
                        mt: 5,
                        width: 250,
                        borderRadius: 10,
                      }}
                      disabled={
                        dataStore.selectedBucket === "" || dataStore.step < 3
                      }
                      onClick={() => {
                        dataStore.changeStep(4);
                        setExpandedAccordion("");
                        setFinish(true);
                      }}
                    >
                      Download Converted files
                    </MDButton>
                  ) : (
                    <></>
                  )}
                </AccordionDetails>
              </Accordion>
              {dataStore.step === 4 && finish && (
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 6,
                    borderRadius: 1,

                    mx: "auto",
                    my: 2,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#B8F5CD",
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{
                        color: "#17A948",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", ml: 1 }}
                    >
                      <MDTypography
                        variant="h6"
                        fontWeight="medium"
                        sx={{ mb: 2, mt: 2 }}
                      >
                        Success
                      </MDTypography>
                      <MDTypography variant="button" sx={{ mb: 2 }}>
                        Process Successfully Completed. You may exit now or
                        begin a new conversation.
                      </MDTypography>
                      <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
                        <MDButton
                          variant="gradient"
                          color="error"
                          sx={{ width: 150, mr: 5, borderRadius: 10 }}
                          onClick={() => {
                            setFinish(false);
                          }}
                        >
                          Exit
                        </MDButton>
                        <MDButton
                          variant="gradient"
                          color="mainButton"
                          sx={{ width: 150, ml: 5, mr: 5, borderRadius: 10 }}
                          onClick={() => {
                            setFinish(false);
                            dataStore.resetState();
                          }}
                        >
                          Start New
                        </MDButton>
                      </Box>
                    </Box>
                    <CloseIcon
                      sx={{ mt: 1, mr: 1, cursor: "pointer" }}
                      onClick={() => {
                        console.log("hello");
                        setFinish(false);
                      }}
                    />
                  </Box>
                </Box>
              )}
            

      </MDBox>
    </Card>
  );
}

export default Converter;
