import InputField from "@/components/ui/InputField";
import { Card, CardContent } from "@/components/ui/card";

const CardSection = ({ title, subtitle, inputs }) => {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold">{title}</h2
        >
        {subtitle && (
          <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          {inputs.map(({ label, value, setValue, symbol = "", isException=false }, index) => (
            <InputField
              key={index}
              label={label}
              value={value}
              setValue={setValue}
              symbol={symbol}
              isException={isException}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSection;
