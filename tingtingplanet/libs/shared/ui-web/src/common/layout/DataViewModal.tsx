"use client";
import { DataAction, Slice } from "@shared/util-client";
import { Field, Modal } from "@shared/ui-web";
import { Utils } from "@shared/util";
import React, { ReactNode } from "react";

interface DataViewModalProps<T extends string, State, SL extends Slice<T, State>, M extends { id: string }> {
  slice: SL;
  renderTitle: (form: M) => string;
  actions?: DataAction<M>[] | ((model: M) => DataAction<M>[]);
  hideActions?: boolean;
  children?: ReactNode;
}

export const DataViewModal = <T extends string, State, SL extends Slice<T, State>, M extends { id: string }>({
  slice,
  children,
  actions = [],
  hideActions,
  renderTitle,
}: DataViewModalProps<T, State, SL, M>) => {
  const [modelName, className] = [slice.refName, Utils.capitalize(slice.refName)];
  const model = slice.use[`${modelName}` as any]();
  const modelModal = slice.use[`${modelName}Modal` as any]();
  return (
    <Modal
      width="80%"
      title={`${renderTitle(model)}`}
      open={modelModal === "view"}
      onCancel={() => slice.do[`reset${className}` as any]()}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      <Field.Container>{children}</Field.Container>
    </Modal>
  );
};
