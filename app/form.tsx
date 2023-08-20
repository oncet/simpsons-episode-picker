import { Dices } from "lucide-react";

import { ComboboxDemo } from "../components/combobox";
import { Button } from "../components/ui/button";

const onSubmit = async () => {
  "use server";

  return { foo: "bar" };
};

export default function Form({ data }: any) {
  return (
    <form method="GET" action={onSubmit} className="flex flex-col gap-4">
      <ComboboxDemo data={data} />
      <Button size="lg" className="uppercase font-extrabold tracking-tight">
        <Dices className="mr-2 h-4 w-4" />
        Get random episode
      </Button>
    </form>
  );
}
