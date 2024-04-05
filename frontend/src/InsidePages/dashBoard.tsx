import { Button, Drawer, Form, Input, Modal, Popover } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import Header from "./Header/header";

const Dashboard = () => {
  const navigate = useNavigate();

  // States
  //userProfile
  const [userDetails, setUserDetails]: any = useState({});
  //load money state
  const [isLoadMoneyModalOpen, setIsLoadMoneyModalOpen] = useState(false);
  //withdraw state
  const [isWithdrawMoneyModalOpen, setIsWithdrawMoneyModalOpen] =
    useState(false);
  // Link New Bank Account
  const [isModalOpenForLinkBankAccount, setIsModalOpenForLinkBankAccount] =
    useState(false);

  //  method of getting value from "antd form"
  const [linkBankForm] = Form.useForm();
  const [sendMoneyForm] = Form.useForm();

  //Get Details

  // user profile
  const getProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8001/users/myprofile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserDetails(response.data.data);
    } catch (e) {}
  };

  // NewAccount
  const addNewBankAccount = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);

      console.log(linkBankForm.getFieldsValue());
      const response = await axios.post(
        "http://localhost:8001/linkBankAccount/bank",
        linkBankForm.getFieldsValue(),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      linkBankForm.resetFields();
      setIsModalOpenForLinkBankAccount(false);
    } catch (error) {
      console.log(error);
    }
  };

  //send Money
  const sendMoney = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);

      console.log(sendMoneyForm.getFieldsValue());
      const response = await axios.post(
        "http://localhost:8001/transaction/UserToUser",
        linkBankForm.getFieldsValue(),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      sendMoneyForm.resetFields();
      setIsModalOpenForLinkBankAccount(false);
      withdrawMoneyHandleOk();
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  // Protected route...
  useEffect(() => {
    const getAccessToken = localStorage.getItem("accessToken");
    if (!getAccessToken) {
      navigate("/login");
    }
    getProfile();
  }, []);

  // controllers

  //load Money Controller
  const showLoadMoneyModal = () => {
    setIsLoadMoneyModalOpen(true);
  };

  const loadMoneyhandleOk = () => {
    setIsLoadMoneyModalOpen(false);
  };

  const loadMoneyhandleCancel = () => {
    setIsLoadMoneyModalOpen(false);
  };
  //withdraw money controller
  const showWithdrawMoneyModal = () => {
    setIsWithdrawMoneyModalOpen(true);
  };

  const withdrawMoneyHandleOk = () => {
    setIsWithdrawMoneyModalOpen(false);
  };

  const withdrawMoneyHandleCancel = () => {
    setIsWithdrawMoneyModalOpen(false);
  };

  return (
    <>
      <div>
        {/* header */}

        <Header userDetails={userDetails} />

        {/*  content */}
        <div className="bg-blue-200 mt-[20vh] h-[20vh] w-[50vw] rounded-2xl m-auto  text-center font-bold text-[20px] text-zinc-700">
          Balance:
          <br />
          <br />
          <div className="text-red-500"> Rs. {userDetails.balance}</div>
        </div>

        {/* //modals */}
        <div className="flex justify-between w-[50vw] m-auto">
          {/* Load Money modals */}
          <div>
            <Button
              type="default"
              onClick={showLoadMoneyModal}
              className="p-[10px] flex justify-center bg-green-500 rounded-xl w-[24vw] h-[7vh] mt-2"
            >
              Load Balance
            </Button>
            <Modal
              title="Load Balance"
              open={isLoadMoneyModalOpen}
              onOk={loadMoneyhandleOk}
              onCancel={loadMoneyhandleCancel}
              okText="Load"
              okButtonProps={{
                type: "default",
                className: "bg-green-500 text-white ",
              }}
            >
              <Form form={sendMoneyForm}>
                <Form.Item label="Bank Name" name="bank_name">
                  <Input />
                </Form.Item>
                <Form.Item label="Enter Amount" name="account_name">
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </div>

          {/* withdraw Balance */}
          <div>
            <Button
              type="default"
              onClick={showWithdrawMoneyModal}
              className="p-[10px] flex justify-center bg-green-500 rounded-xl w-[24vw] h-[7vh] mt-2"
            >
              Send Money
            </Button>
            <Modal
              title="Transfer Money"
              open={isWithdrawMoneyModalOpen}
              onOk={() => {
                sendMoney();
              }}
              onCancel={withdrawMoneyHandleCancel}
              okText="Send"
              okButtonProps={{
                type: "default",
                className: "bg-green-500 text-white ",
              }}
            >
              <Form form={linkBankForm}>
                <Form.Item label="Email id" name="friend_email">
                  <Input />
                </Form.Item>
                <Form.Item label="Enter Amount" name="amount">
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>

        <div>
          {/* modal */}
          <Button
            type="default"
            onClick={() => {
              setIsModalOpenForLinkBankAccount(true);
            }}
            className="w-[50vw] h-[10vh] m-auto pt-[3vh] mt-2 flex justify-center  bg-green-500 rounded-xl"
          >
            Link New Bank Account
          </Button>
          <Modal
            title="Link Bank Account"
            open={isModalOpenForLinkBankAccount}
            onOk={() => {
              addNewBankAccount();
            }}
            onCancel={() => {
              setIsModalOpenForLinkBankAccount(false);
            }}
            okText="Link Bank"
            okButtonProps={{
              type: "default",
              className: "bg-red-500 text-white ",
            }}
          >
            <Form form={linkBankForm}>
              <Form.Item label="Bank Name" name="bank_name">
                <Input />
              </Form.Item>
              <Form.Item label="Account Name" name="account_name">
                <Input />
              </Form.Item>
              <Form.Item label="Account Number" name="account_number">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
