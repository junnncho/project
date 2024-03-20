"use client";
import { AdminState, addAdminToStore } from "./admin/admin.store";
import { CurrencyState, addCurrencyToStore } from "./currency/currency.store";
import { FileState, addFileToStore } from "./file/file.store";
import { KeyringState, addKeyringToStore } from "./keyring/keyring.store";
import { NotificationState, addNotificationToStore } from "./notification/notification.store";
import { ProductState, addProductToStore } from "./product/product.store";
import { SetGet } from "@shared/util-client";
import { ThingState, addThingToStore } from "./thing/thing.store";
import { UiState, addUiToStore } from "./ui/ui.store";

export interface State
  extends AdminState,
    CurrencyState,
    KeyringState,
    ProductState,
    ThingState,
    UiState,
    NotificationState,
    FileState {}
export type RootState = State;
export const addToStore = ({ set, get, pick }: SetGet<RootState>) => ({
  ...addNotificationToStore({ set, get, pick }),
  ...addAdminToStore({ set, get, pick }),
  ...addCurrencyToStore({ set, get, pick }),
  ...addKeyringToStore({ set, get, pick }),
  ...addProductToStore({ set, get, pick }),
  ...addThingToStore({ set, get, pick }),
  ...addUiToStore({ set, get, pick }),
  ...addFileToStore({ set, get, pick }),
});
