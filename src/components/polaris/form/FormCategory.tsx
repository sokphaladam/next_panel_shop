"use client";
import { Grid, InlineGrid, Modal, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { PolarisCategory } from "../PolarisCategory";
import {
  useCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryIndexMutation,
  useUpdateCategoryMutation,
} from "@/gql/graphql";
import { useCustomToast } from "@/components/custom/CustomToast";

interface Props {
  id?: number;
  title: string;
  active: boolean;
  setActive: (active: boolean) => void;
  activator?:
    | React.RefObject<HTMLElement>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
}

export function FormCategory(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const [nameInput, setNameInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [prevIndex, setPrevIndex] = useState("");
  const [cId, setCId] = useState(0);

  useCategoryQuery({
    skip: !props.id,
    fetchPolicy: "no-cache",
    variables: {
      categoryId: Number(props.id),
    },
    onCompleted: (data) => {
      if (data.category) {
        setNameInput(data.category?.name + "");
        setCId(data.category.root || 0);
        setIndexInput(data.category.index + "");
        setPrevIndex(data.category.index + "");
      }
    },
  });

  const [create, propsCreate] = useCreateCategoryMutation({
    refetchQueries: ["categoryList", "category"],
  });
  const [update, propsUpdate] = useUpdateCategoryMutation({
    refetchQueries: ["categoryList", "category"],
  });
  const [updateIndex, propsUpdateIndex] = useUpdateCategoryIndexMutation({
    refetchQueries: ["categoryList", "category"],
  });

  const toggleActive = useCallback(() => {
    props.setActive(!props.active);
    setNameInput("");
    setCId(0);
  }, [props]);

  const handleSave = useCallback(() => {
    const input = {
      name: nameInput,
      root: Number(cId),
    };

    if (!props.id) {
      create({
        variables: {
          data: input,
        },
      })
        .then((res) => {
          if (res.data?.createCategory) {
            setToasts([
              ...toasts,
              { content: "Create new category.", status: "success" },
            ]);
            toggleActive();
          } else {
            setToasts([
              ...toasts,
              { content: "Oop! somthing was wrong.", status: "error" },
            ]);
          }
        })
        .catch(() => {
          setToasts([
            ...toasts,
            { content: "Oop! somthing was wrong.", status: "error" },
          ]);
        });
    } else {
      update({
        variables: {
          data: input,
          updateCategoryId: Number(props.id),
        },
      })
        .then((res) => {
          if (res.data?.updateCategory) {
            if (indexInput.toString() !== prevIndex.toString()) {
              updateIndex({
                variables: {
                  data: {
                    id: Number(props.id),
                    index: Number(indexInput),
                  },
                },
              });
            }
            setToasts([
              ...toasts,
              { content: "Update category #" + props.id, status: "success" },
            ]);
            toggleActive();
          } else {
            setToasts([
              ...toasts,
              { content: "Oop! somthing was wrong.", status: "error" },
            ]);
          }
        })
        .catch(() => {
          setToasts([
            ...toasts,
            { content: "Oop! somthing was wrong.", status: "error" },
          ]);
        });
    }
  }, [
    nameInput,
    cId,
    props.id,
    create,
    setToasts,
    toasts,
    toggleActive,
    update,
    prevIndex,
    indexInput,
    updateIndex,
  ]);

  return (
    <Modal
      open={props.active}
      onClose={toggleActive}
      title={props.title}
      activator={props.activator}
      primaryAction={{
        content: "Save",
        onAction: handleSave,
        disabled: propsCreate.loading,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: toggleActive,
          disabled: propsCreate.loading,
        },
      ]}
    >
      <Modal.Section>
        <InlineGrid columns={["twoThirds", "oneThird"]} gap={"200"}>
          <TextField
            label="Name"
            placeholder="Enter category name..."
            value={nameInput}
            onChange={setNameInput}
            autoComplete="off"
          />
          {props.id && (
            <TextField
              label="Index"
              placeholder="Enter category index..."
              value={indexInput}
              onChange={setIndexInput}
              autoComplete="off"
              type="number"
            />
          )}
          <PolarisCategory
            value={{
              category: cId,
            }}
            onChange={(v) => {
              setCId(v.category || 0);
            }}
          />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
