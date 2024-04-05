import { Button, Drawer, Popover } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";

const Header = ({ userDetails }: any) => {
  const navigate = useNavigate();
  const [openBankListDrawer, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onCloseBankListDrawer = () => {
    setOpen(false);
  };

  const [allLinkedBank, setAllLinkedBanked]: any = useState([]);

  //   drawer
  const [openAllLinkedBankDrawer, setopenAllLinkedBankDrawer] = useState(false);

  const showLinkedBankListOpen = () => {
    setopenAllLinkedBankDrawer(true);
  };

  const showLinkedBankListClose = () => {
    setopenAllLinkedBankDrawer(false);
  };
  const getAllLinkedBank = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8001/linkBankAccount",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      //   console.log(response.data.data);
      setAllLinkedBanked(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="bg-red-400 h-[7vh] flex justify-between items-center">
        <div className=" ml-5 bg-red-400 h ">Welcome {userDetails.name}</div>
        <div className="color-white-500  float-right flex flex-row">
          <Popover
            placement="bottom"
            title={userDetails.name}
            content=<div className="mr-5">
              <div>{userDetails.email}</div>

              <Button
                type="default"
                onClick={() => {
                  getAllLinkedBank();
                  showDrawer();
                }}
              >
                Linked Bank Accounts
              </Button>
              <Drawer
                title="Linked Bank Accounts"
                onClose={onCloseBankListDrawer}
                open={openBankListDrawer}
              >
                <div>
                  {allLinkedBank.map((bank: any) => {
                    return (
                      <>
                        <div>
                          <b>{bank.bank_name}</b>
                          <br />
                          <br />
                          <hr />
                        </div>
                      </>
                    );
                  })}
                </div>
              </Drawer>
              <div>
                <a
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          >
            <div className="rounded-full bg-blue-700 mr-5 w-[fit-content] h-[35px] pl-[2vw] pr-[2vw] items-center text-center crusior.pointer">
              {userDetails && userDetails.name ? userDetails.name[0] : "user"}
            </div>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Header;
