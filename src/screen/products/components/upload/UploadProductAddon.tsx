import { ProductInput } from '@/gql/graphql';
import { Button, Checkbox, Icon, IndexTable, TextField } from '@shopify/polaris';
import { DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import react, { useCallback } from 'react';

interface Props {
  value: ProductInput;
  setValue: (v: ProductInput) => void;
}

export function UploadProductAddon(props: Props) {
  const handleChangeText = useCallback(
    (v: string | boolean, text: string, index: number) => {
      let dummy: any = (props.value.addons as any).map((x: any) => {
        return {
          ...x,
        };
      });
      dummy[index][text] = v;
      props.setValue({
        ...props.value,
        addons: dummy,
      });
    },
    [props],
  );

  return (
    <div className="flex flex-col gap-1">
      <IndexTable
        headings={[{ title: 'Name' }, { title: 'Price' }, { title: 'control', alignment: 'end' }]}
        itemCount={1}
        selectable={false}
      >
        {props.value.addons?.map((x, i) => {
          return (
            <IndexTable.Row key={i} position={i} id={i + ''}>
              <IndexTable.Cell>
                <TextField
                  autoComplete="off"
                  value={x?.name || ''}
                  label
                  labelHidden
                  placeholder="Enter name addon"
                  onChange={(v) => {
                    handleChangeText(v, 'name', i);
                  }}
                />
              </IndexTable.Cell>
              <IndexTable.Cell>
                <TextField
                  autoComplete="off"
                  value={x?.value || ''}
                  label
                  labelHidden
                  placeholder="Enter price addons"
                  // helpText={'Ex: 10%,25%,50%,...'}
                  onChange={(v) => handleChangeText(v, 'value', i)}
                  type="number"
                  prefix="$"
                />
              </IndexTable.Cell>
              <IndexTable.Cell>
                <div className="flex flex-row justify-center">
                  <Button
                    onClick={() => {
                      props.setValue({
                        ...props.value,
                        addons: [...(props.value.addons || []).filter((x, ii) => ii !== i)],
                      });
                    }}
                    size="slim"
                    icon={DeleteIcon}
                    variant="tertiary"
                    tone="critical"
                  ></Button>
                </div>
              </IndexTable.Cell>
            </IndexTable.Row>
          );
        })}
      </IndexTable>
      {/* {props.value.addons?.map((x, i) => {
        return (
          <div key={i} className="p-2 flex flex-row gap-2 justify-between">
            <div>
              <TextField
                autoComplete="off"
                value={x?.name || ''}
                label
                labelHidden
                placeholder="Enter name addon"
                onChange={(v) => {
                  handleChangeText(v, 'name', i);
                }}
              />
            </div>
            <div className="w-[350px]">
              <TextField
                autoComplete="off"
                value={x?.value || ''}
                label
                labelHidden
                placeholder="Enter price addons"
                // helpText={'Ex: 10%,25%,50%,...'}
                onChange={(v) => handleChangeText(v, 'value', i)}
                type="number"
                prefix="$"
              />
            </div>
            <div>
            </div>
          </div>
        );
      })} */}
      <div
        className="border-collapse border-dotted border-[0.5px] rounded-md p-2 hover:bg-gray-300 cursor-pointer"
        onClick={() => {
          props.setValue({
            ...props.value,
            addons: [...(props.value.addons || []), { name: '', value: '', isRequired: false }],
          });
        }}
      >
        <Icon source={PlusIcon} />
      </div>
    </div>
  );
}
