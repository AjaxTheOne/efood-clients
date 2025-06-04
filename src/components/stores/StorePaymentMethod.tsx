import { PaymentMethod } from "../../types/stores";
import { ChevronRightIcon, CreditCardIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

type Props = {
    paymentMethod: PaymentMethod;
    onClick: () => void;
};

export function StorePaymentMethod({ paymentMethod, onClick }: Props) {
    const { t } = useTranslation(undefined, {keyPrefix: "payment_method"});
    return (
        <div className="w-full rounded-md border border-gray-300 bg-white">
            <a 
                onClick={onClick}
                href="javascript:void(0)"
                className="flex justify-between items-center p-3"
            >
                <div className="flex gap-2 items-center capitalize">
                    { paymentMethod === "card" &&
                        <>
                            <CreditCardIcon className="size-4"/>
                            {t(paymentMethod)}
                        </>
                    }
                    { paymentMethod === "cod" &&
                        <>
                            <BanknotesIcon className="size-4"/>
                            {t(paymentMethod)}
                        </>
                    }
                </div>
                <ChevronRightIcon className="size-6"/>
            </a>
        </div>
    )
}