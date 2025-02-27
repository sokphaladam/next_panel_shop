"use client";
import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface IButton {
  title: string;
  onPress?: (str?: any) => void;
  class?: any;
  invisible?: boolean;
}

interface IState {
  visible?: boolean;
  title?: string;
  message?: string;
  buttons: IButton[];
  body?: React.ComponentType[] | React.ReactNode[];
  flush?: boolean;
}

export class ModalComponent extends Component<{}, IState> {
  pressRef: any | null = null;

  state: IState = {
    visible: false,
    title: "",
    message: "",
    buttons: [],
    body: [],
  };

  onShow = (p: IState) => {
    this.setState({
      ...p,
      visible: true,
    });
  };

  onPress = (press?: () => void) => {
    if (!!press) {
      this.pressRef = press;
    }
    this.onClose();
  };

  onClose = () => {
    this.setState(
      {
        title: "",
        message: "",
        buttons: [],
        body: [],
        visible: false,
      },
      () => {
        if (!!this.pressRef) {
          this.pressRef();
          this.pressRef = null;
        }
      }
    );
  };

  render() {
    const primary_button = this.state.buttons.filter(
      (f) => f.class === "primary"
    )[0];
    const secondary_button = this.state.buttons.filter(
      (f) => f.class !== "primary"
    );

    return (
      <Dialog open={this.state.visible || false} onOpenChange={this.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{this.state.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {this.state.body &&
              this.state.body.map((body, index) => {
                return <div key={index}>{body as React.ReactNode}</div>;
              })}
          </DialogDescription>
          <DialogFooter>
            {/* <Button onClick={this.onClose} variant={"secondary"} size={"sm"}>
              Close
            </Button> */}
            {secondary_button &&
              secondary_button.length > 0 &&
              secondary_button.map((x, i) => {
                return (
                  <Button
                    variant={"secondary"}
                    className={x.class}
                    onClick={x.onPress ?? this.onClose}
                    key={i}
                  >
                    {x.title}
                  </Button>
                );
              })}
            {primary_button && (
              <Button
                onClick={() => {
                  primary_button.onPress && primary_button.onPress();
                  this.onClose();
                }}
                variant={"default"}
                className={primary_button.class}
              >
                {primary_button.title}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    /*
    return (
      <Modal
        open={this.state.visible || false}
        onClose={this.onClose}
        title={this.state.title}
        secondaryActions={secondary_button.map((x) => {
          return {
            content: x.title,
            onAction: () => this.onPress(x.onPress),
            destructive: x.class === "danger",
          };
        })}
        primaryAction={
          primary_button
            ? {
              content: primary_button.title,
              onAction: () => this.onPress(primary_button.onPress),
            }
            : undefined
        }
      >
        {this.state.message && (
          <Modal.Section flush={this.state.flush}>
            <div>{this.state.message}</div>
          </Modal.Section>
        )}
        {this.state.body &&
          this.state.body.length > 0 &&
          this.state.body.map((body, index) => {
            return (
              <Modal.Section key={index}>
                {body as React.ReactNode}
              </Modal.Section>
            );
          })}
      </Modal>
    );
    */
  }
}
