"use client";
import {
  OrderItem,
  StatusOrderItem,
  useMarkOrderItemStatusMutation,
  useSetPrintOrderItemToKitchenMutation,
  useSetOrderItemDiscountMutation,
} from "@/gql/graphql";
import {
  Button,
  Icon,
  IndexTable,
  Text,
  Popover,
  ActionList,
  TextField,
} from "@shopify/polaris";
import moment from "moment";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import { ControllChangeQty } from "./ControllChangeQty";
import { Modal } from "@/hook/modal";
import {
  DeleteIcon,
  PrintIcon,
  DiscountIcon,
  MenuHorizontalIcon,
  CheckIcon,
} from "@shopify/polaris-icons";
import { useUser } from "@/service/UserProvider";
import { ButtonReadyToServe } from "./button-ready-to-serve";

interface Props {
  item?: OrderItem;
  index: number;
}

export function OrderListItem({ item, index }: Props) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const user = useUser();
  const [popoverActive, setPopoverActive] = React.useState(false);
  const [discountModalActive, setDiscountModalActive] = React.useState(false);
  const [discountValue, setDiscountValue] = React.useState(
    item?.discount?.toString() || "0"
  );
  const [discountType, setDiscountType] = React.useState<
    "percentage" | "amount"
  >("percentage");

  const priceAfterDis = useMemo(
    () =>
      Number(item?.price) -
      (Number(item?.price) * Number(item?.discount)) / 100,
    [item]
  );

  const previewDiscountPrice = useMemo(() => {
    if (discountType === "percentage") {
      return (
        Number((item?.price || 0) * (item?.qty || 0)) -
        (Number((item?.price || 0) * (item?.qty || 0)) *
          Number(discountValue)) /
          100
      );
    } else {
      return (
        Number((item?.price || 0) * (item?.qty || 0)) - Number(discountValue)
      );
    }
  }, [item?.price, item?.qty, discountValue, discountType]);
  const [mark] = useMarkOrderItemStatusMutation({
    refetchQueries: ["order", "orderList"],
  });
  const [setPrint] = useSetPrintOrderItemToKitchenMutation({
    refetchQueries: ["order", "orderList"],
  });
  const [setDiscount] = useSetOrderItemDiscountMutation({
    refetchQueries: ["order", "orderList"],
  });

  const rePrintToKitchen = useCallback(
    (id: number) => {
      setPrint({
        variables: {
          setPrintOrderItemToKitchenId: Number(id),
        },
      });
    },
    [setPrint]
  );

  const handleDiscountSubmit = useCallback(() => {
    let discountPercentage: number;

    if (discountType === "percentage") {
      discountPercentage = Number(discountValue);
    } else {
      // Convert amount to percentage
      const originalPrice = Number((item?.price || 0) * (item?.qty || 0)) || 0;
      discountPercentage =
        originalPrice > 0 ? (Number(discountValue) / originalPrice) * 100 : 0;
    }

    console.log(discountPercentage);

    setDiscount({
      variables: {
        orderDetailId: Number(item?.id),
        discount: discountPercentage,
      },
    }).then(() => {
      setDiscountModalActive(false);
    });
  }, [
    setDiscount,
    item?.id,
    item?.price,
    item?.qty,
    discountValue,
    discountType,
  ]);

  const handleMenuSelect = useCallback(
    (actionId: string) => {
      setPopoverActive(false);

      switch (actionId) {
        case "delete":
          Modal.dialog({
            title: "Confirmation",
            body: [
              <div key={1}>
                {"Are you sure to remove this item: " + item?.product?.title}
              </div>,
            ],
            buttons: [
              {
                title: "Yes",
                onPress: () => {
                  mark({
                    variables: {
                      markOrderItemStatusId: Number(item?.id),
                      status: StatusOrderItem.Deleted,
                    },
                  });
                },
              },
            ],
          });
          break;
        case "print":
          rePrintToKitchen(item?.id || 0);
          break;
        case "discount":
          setDiscountModalActive(true);
          break;
      }
    },
    [item, mark, rePrintToKitchen]
  );

  return (
    <React.Fragment key={index}>
      <IndexTable.Row
        position={index}
        id={item?.id + ""}
        tone={
          item?.status === StatusOrderItem.Completed ? "success" : undefined
        }
      >
        <IndexTable.Cell>{index + 1}</IndexTable.Cell>
        <IndexTable.Cell>
          <div className="flex flex-row gap-2">
            <Image
              alt=""
              src={item?.sku?.image || item?.product?.images || ""}
              width={40}
              height={40}
              objectFit="contain"
              style={{
                width: 40,
                borderRadius: 5,
                maxHeight: 40,
                objectFit: "cover",
              }}
              loading="lazy"
            />
            {/* <Thumbnail alt="" source={item?.product?.images + ''} size="small" /> */}
            <div className="flex flex-col justify-between">
              <Text as="p" variant="bodySm" truncate>
                {item?.product?.title} {/* <small> */}
                <strong>({item?.sku?.name})</strong>
                {/* </small> */}
              </Text>
              <div className="flex flex-row">
                <Text as="strong" variant="bodySm" tone="base">
                  {item?.status} x{item?.qty}
                </Text>
              </div>
              {item?.status !== StatusOrderItem.Pending && (
                <div>
                  <small className="text-pink-700">
                    From last updated (
                    {moment(new Date(item?.printedDate as any)).fromNow(true)})
                  </small>

                  {item?.printSuccessDate && (
                    <small className="text-pink-700">
                      <br />
                      Print successed (
                      {moment(new Date(item?.printSuccessDate as any)).fromNow(
                        true
                      )}
                      )
                    </small>
                  )}
                </div>
              )}
            </div>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="flex flex-row items-center gap-1">
            {priceAfterDis !== item?.price && (
              <Text
                as="span"
                variant="bodySm"
                tone="critical"
                textDecorationLine="line-through"
              >{`$${item?.price?.toFixed(2)}`}</Text>
            )}
            <Text as="strong" variant="bodySm">
              ${priceAfterDis.toFixed(2)}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="strong" variant="bodySm" fontWeight="bold" tone="success">
            ${(priceAfterDis * Number(item?.qty)).toFixed(2)}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <ControllChangeQty item={item || {}} />
        </IndexTable.Cell>
        {[
          StatusOrderItem.Pending,
          StatusOrderItem.Making,
          StatusOrderItem.Completed,
        ].includes(item?.status as any) && (
          <IndexTable.Cell>
            <div className="flex flex-col items-center">
              <div className="flex flex-row items-center gap-1">
                <Popover
                  activator={
                    <Button
                      size="slim"
                      onClick={() => setPopoverActive(!popoverActive)}
                      disclosure
                      icon={MenuHorizontalIcon}
                    />
                  }
                  active={popoverActive}
                  onClose={() => setPopoverActive(false)}
                >
                  <ActionList
                    items={[
                      {
                        content: "Delete Item",
                        icon: DeleteIcon,
                        destructive: true,
                        disabled:
                          ![1, 2, 6].includes(user?.role?.id || 0) &&
                          item?.status !== StatusOrderItem.Pending,
                        onAction: () => handleMenuSelect("delete"),
                      },
                      {
                        content: item?.isPrint ? "Re-print" : "Print",
                        icon: PrintIcon,
                        disabled:
                          item?.status === StatusOrderItem.Pending ||
                          ![6, 2].includes(user?.role?.id || 0),
                        onAction: () => handleMenuSelect("print"),
                      },
                      {
                        content: "Set Discount",
                        icon: DiscountIcon,
                        disabled: ![1, 2, 6].includes(user?.role?.id || 0),
                        onAction: () => handleMenuSelect("discount"),
                      },
                      {
                        content: "Served",
                        icon: CheckIcon,
                        onAction: () => buttonRef.current?.click(),
                      },
                    ]}
                  />
                </Popover>

                {/* Ready to serve button stays separate as it's a special action */}
                {![StatusOrderItem.Completed, StatusOrderItem.Pending].includes(
                  item?.status!
                ) && (
                  <ButtonReadyToServe
                    id={item?.id ?? 0}
                    ref={buttonRef}
                    as="text"
                  />
                )}
              </div>
              {item?.isPrint ? (
                <div>
                  <small className="text-pink-700">Already to kitchen</small>
                </div>
              ) : (
                <></>
              )}
            </div>
          </IndexTable.Cell>
        )}
      </IndexTable.Row>
      {(item?.addons || item?.remark) && (
        <IndexTable.Row position={index} id={item?.id + ""}>
          <IndexTable.Cell></IndexTable.Cell>
          <IndexTable.Cell colSpan={5} className="bg-yellow-200">
            {item.addons && <div>Addon: {item.addons}</div>}
            {item.remark && <div>Remark: {item.remark}</div>}
          </IndexTable.Cell>
        </IndexTable.Row>
      )}

      {/* Discount Modal */}
      {discountModalActive && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              minWidth: "450px",
            }}
          >
            <h3 style={{ marginBottom: "16px" }}>
              Set Discount for {item?.product?.title}
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <Text as="p" variant="bodyMd">
                Current Amount: $
                {((item?.price || 0) * (item?.qty || 0)).toFixed(2)}
              </Text>
              <Text as="p" variant="bodyMd">
                Current Discount: {item?.discount?.toFixed(2)}%
              </Text>
            </div>

            {/* Discount Type Selection */}
            <div style={{ marginBottom: "16px" }}>
              <Text as="legend" variant="bodyMd" fontWeight="semibold">
                Discount Type:
              </Text>
              <div style={{ marginTop: "8px", display: "flex", gap: "12px" }}>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <input
                    type="radio"
                    name="discountType"
                    checked={discountType === "percentage"}
                    onChange={() => {
                      setDiscountType("percentage");
                      setDiscountValue("0");
                    }}
                  />
                  Percentage (%)
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <input
                    type="radio"
                    name="discountType"
                    checked={discountType === "amount"}
                    onChange={() => {
                      setDiscountType("amount");
                      setDiscountValue("0");
                    }}
                  />
                  Amount ($)
                </label>
              </div>
            </div>

            <TextField
              label={`Discount ${discountType === "percentage" ? "Percentage" : "Amount"}`}
              value={discountValue}
              onChange={setDiscountValue}
              type="number"
              min="0"
              max={
                discountType === "percentage" ? "100" : item?.price?.toString()
              }
              suffix={discountType === "percentage" ? "%" : "$"}
              autoComplete="off"
            />

            {/* Preview */}
            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
              }}
            >
              <Text as="p" variant="bodySm" tone="subdued">
                Preview: ${previewDiscountPrice.toFixed(2)}
                {discountType === "amount" && (
                  <span>
                    {" "}
                    (
                    {(
                      (Number(discountValue) /
                        (Number((item?.price || 0) * (item?.qty || 0)) || 1)) *
                      100
                    ).toFixed(1)}
                    % off)
                  </span>
                )}
              </Text>
            </div>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={() => setDiscountModalActive(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDiscountSubmit}
                disabled={
                  Number(discountValue) < 0 ||
                  (discountType === "amount" &&
                    Number(discountValue) >
                      (Number((item?.price || 0) * (item?.qty || 0)) || 0))
                }
              >
                Apply Discount
              </Button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
