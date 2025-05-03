import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TableSetListQuery } from "@/gql/graphql";

interface Props {
  selectedTableIds: string[];
  toggleTableSelection: (tableId: string) => void;
  handleLinkTables: () => void;
  data: TableSetListQuery | undefined;
}

export function SelectTableLink(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Tables to Link</CardTitle>
        <CardDescription>
          Choose at least two tables to view their orders together
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {props.data?.tableSetList
            ?.filter((x) => (x?.order?.items?.length || 0) > 0)
            .map((x) => {
              const total =
                x?.order?.items?.reduce((a, b) => {
                  const discount =
                    Number(b?.price || 0) * ((b?.discount || 0) / 100);
                  const amount = ((b?.price || 0) - discount) * (b?.qty || 0);
                  return (a = a + amount);
                }, 0) || 0;
              return (
                <Card
                  key={x?.set}
                  className={`cursor-pointer transition-all ${
                    props.selectedTableIds.includes(x?.set + "")
                      ? "border-primary"
                      : "hover:border-muted-foreground"
                  }`}
                  onClick={() => props.toggleTableSelection(x?.set + "")}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        Table #{String(x?.set).padStart(2, "0")}
                      </CardTitle>
                      <Checkbox
                        checked={props.selectedTableIds.includes(x?.set + "")}
                        onCheckedChange={() =>
                          props.toggleTableSelection(x?.set + "")
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      {x?.order?.items?.reduce(
                        (a, b) => (a = a + (b?.qty || 0)),
                        0
                      )}{" "}
                      items
                    </p>
                    <p className="font-medium">${total.toFixed(2)}</p>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={props.handleLinkTables}
          disabled={props.selectedTableIds.length < 2}
        >
          Link Selected Tables
        </Button>
      </CardFooter>
    </Card>
  );
}
