import InputField from "@/components/ui/InputField";
import { Card, CardContent } from "@/components/ui/card";

const CardSection = ({ title, inputs }) => {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex flex-wrap items-center gap-4">
          {inputs.map(({ label, value, setValue, symbol = "" }, index) => (
            <InputField
              key={index}
              label={label}
              value={value}
              setValue={setValue}
              symbol={symbol}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSection;
