import PaymentCard, { PAYMENT_OPTION } from "components/card/payment-method";
import { Divider } from "components/divider";
import { SecondaryLayout } from "components/layout/layout-secondary";
import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useState } from "react";
import cx from "utils/helpers";
import { Box, Header, Icon, Text } from "zmp-ui";
import { CartItems } from "./cart-items";
import { Delivery } from "./delivery";
import { CartPreview } from "./preview";
import { TermsAndPolicies } from "./term-and-policies";

type PaymentMethodProps = {
  type: PAYMENT_OPTION,
  text: string,
  isOn: boolean,
}

const CartPage: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();

  const PaymentOptions = () => {
    const [selectedMethod, setSelectedMethod] = useState<PAYMENT_OPTION>(PAYMENT_OPTION.COD);

    const methods = [
      {
        type: PAYMENT_OPTION["COD"],
        text: "Thanh toán khi nhận hàng (COD)",
        isOn: true
      }, {
        type: PAYMENT_OPTION["CREDIT_CARD"],
        text: "Thẻ tín dụng",
        isOn: true
      },
      {
        type: PAYMENT_OPTION["ZALOPAY"],
        text: "Ví Zalopay",
        isOn: true
      },
      {
        type: PAYMENT_OPTION["MOMO"],
        text: "Ví Momo",
        isOn: false
      },
    ]

    const handleChangeMethod = ({ type, isOn }: PaymentMethodProps) => {
      if (isOn)
        setSelectedMethod(type);
    };

    return (
      <Box className="space-y-3 p-3">
        <Text.Header className="mt-1 mb-5">Phương thức thanh toán</Text.Header>
        {methods.map(method => (
          <Box key={method.type} flex alignItems="center"
            className={cx("border",
              method.type == selectedMethod ? 'cursor-pointer border-primary' : 'border-slate-200',
              "mx-2 p-3 rounded-lg shadow-md gap-2",
              method.isOn ? 'bg-white' : 'bg-slate-200 cursor-default')
            }
            role='button'
            onClick={(e) => handleChangeMethod(method)}
          >
            <Icon icon={selectedMethod == method.type ? "zi-radio-checked" : "zi-radio-unchecked"} size={18} />
            <PaymentCard text={method.text} method={method.type} isActive={selectedMethod == method.type} />
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <SecondaryLayout>
      <Header title="Giỏ hàng" showBackIcon={false} />
      <CartItems />
      <Delivery />
      <Divider size={12} />
      <PaymentOptions />
      <Divider size={12} />
      <TermsAndPolicies />
      <Divider size={32} className="flex-1" />
      {!keyboardVisible && <CartPreview />}
    </SecondaryLayout>
  );
};

export default CartPage;
