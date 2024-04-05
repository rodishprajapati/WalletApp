import { Button, Drawer, Form, Input, Modal, Popover } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../pageComponents/header";

const Dashboardd = () => {
  const [userDetails, setUserDetails]: any = useState({});
  const [bankDetails, setbankDetails]: any = useState([]);

  const [selectedBankAccount, setselectedBankAccount]: any = useState({});

  const [bankAddForm] = Form.useForm();
  const [bankLoadMoneyForm] = Form.useForm();

  // controllers...
  const [isOpenManageBankAccountDrawer, setisOpenManageBankAccountDrawer] =
    useState(false);

  const [isOpenModelAddBankAccount, setisOpenModelAddBankAccount] =
    useState(false);

  const [isOpenModelLoadMoney, setisOpenModelLoadMoney] = useState(false);

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:8000/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserDetails(response.data.data);
    } catch (e) {}
  };

  // Protected route...
  useEffect(() => {
    const getAccessToken = localStorage.getItem("accessToken");
    if (!getAccessToken) {
      navigate("/login");
    }
    getProfile();
  }, []);

  const getBanks = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get("http://localhost:8000/banks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setbankDetails(response.data.data);
    } catch (e) {}
  };

  const addBankAccount = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:8000/banks",
        bankAddForm.getFieldsValue(),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      bankAddForm.resetFields();
      setisOpenModelAddBankAccount(false);
      getBanks();
    } catch (e) {}
  };

  const loadMoney = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // data to send..

      const dataToSend = {
        ...bankLoadMoneyForm.getFieldsValue(),

        bank_id: selectedBankAccount.bank_id,
      };

      const response = await axios.post(
        "http://localhost:8000/banks/load",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setisOpenModelLoadMoney(false);
      getBanks();
      getProfile();
    } catch (e) {}
  };

  return (
    <>
      <Header userDetails={userDetails} />

      <div className="bg-gradient-to-r from-orange-500 to-purple-500 p-5 text-white font-bold mt-10 w-[50vw] m-auto rounded-xl shadow-2xl">
        <div className="font-bold text-[20px] text-center flex items-center justify-center gap-3">
          Balance:
          <Popover
            trigger={"click"}
            content={
              <>
                {bankDetails.map((bank: any) => (
                  <>
                    <div
                      className="p-2 mt-2 cursor-pointer hover:bg-green-100 rounded-md w-[200px]"
                      onClick={() => {
                        setselectedBankAccount({
                          bank_id: bank._id.toString(),
                          bank_name: bank.bank_name.toString(),
                        });

                        setisOpenModelLoadMoney(true);
                      }}
                    >
                      {bank.bank_name}
                    </div>
                  </>
                ))}
              </>
            }
          >
            <Button className="text-white" onClick={getBanks}>
              +
            </Button>
          </Popover>
        </div>

        <div className="font-bold text-[50px] text-center">
          Rs. {userDetails.balance}
        </div>
      </div>

      <div
        onClick={() => {
          getBanks();
          setisOpenManageBankAccountDrawer(true);
        }}
      >
        <div className="bg-gradient-to-r  from-gray-300 to-gray-50 rounded-sm m-3 p-5 mt-5 font-semibold cursor-pointer">
          Manage Bank Accounts
        </div>
      </div>

      {/* Conditional components */}

      <Drawer
        title="Manage Bank Accounts"
        onClose={() => {
          setisOpenManageBankAccountDrawer(false);
        }}
        open={isOpenManageBankAccountDrawer}
      >
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setisOpenModelAddBankAccount(true);
            }}
          >
            Add new account
          </Button>
        </div>

        <br />
        {bankDetails.map((bank: any) => (
          <>
            <div className="p-2 bg-yellow-100 mt-2">
              <b> {bank.bank_name}</b> <br /> {bank.account_number}
            </div>
          </>
        ))}
      </Drawer>

      <Modal
        title="Add new bank account"
        open={isOpenModelAddBankAccount}
        okText="Add bank account"
        onOk={() => {
          addBankAccount();
        }}
        onCancel={() => {
          setisOpenModelAddBankAccount(false);
        }}
        okButtonProps={{
          type: "default",
          className: "bg-red-500 text-white ",
        }}
      >
        <br />
        <Form form={bankAddForm}>
          Bank name:
          <Form.Item name="bank_name">
            <Input />
          </Form.Item>
          Account name:
          <Form.Item name="account_name">
            <Input />
          </Form.Item>
          Account number:
          <Form.Item name="account_number">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`Load Money from ${selectedBankAccount.bank_name}`}
        open={isOpenModelLoadMoney}
        okText="Load"
        onOk={() => {
          loadMoney();
        }}
        onCancel={() => {
          setisOpenModelLoadMoney(false);
        }}
        okButtonProps={{
          type: "default",
          className: "bg-red-500 text-white ",
        }}
      >
        <br />
        <Form form={bankLoadMoneyForm}>
          Amount to load:
          <Form.Item name="balance">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Dashboardd;
