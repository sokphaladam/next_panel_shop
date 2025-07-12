import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableSet } from "@/gql/graphql";

interface Props {
  items: TableSet[];
}

export function MergeTable(props: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"sm"} variant={"default"} className="bg-violet-500">
          Merge Table
        </Button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle>Merge Table</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {props.items.map((x, i) => {
          return <Button key={i}>{x.set}</Button>;
        })}
      </DialogContent>
    </Dialog>
  );
}
