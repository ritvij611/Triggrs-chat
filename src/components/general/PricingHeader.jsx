import Image from "next/image";
import { CustomTab } from "../ui/customtab";

export const PricingHeader = ({title, subtitle, frequencies, selectedFrequency, onFrequencyChange}) => (
  <div className="space-y-7 text-center">
    <div className="space-y-4">
      <Image src="/images/final-logo.svg" className="mx-auto size-20" width={100} height={100} alt="logo" />
      <h1 className="text-4xl font-medium md:text-3xl">{title}</h1>
      <p>{subtitle}</p>
    </div>
    <div className="mx-auto flex w-fit rounded-full bg-emerald-100 p-1">
      {frequencies.map((freq) => (
        <CustomTab
          key={freq}
          text={freq}
          selected={selectedFrequency === freq}
          setSelected={onFrequencyChange}
          discount={freq === "yearly"}
        />
      ))}
    </div>
  </div>
);